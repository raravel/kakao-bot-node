// native modules
const fs = require('fs');
const crypto = require('crypto');
const dns = require('dns');
const vm = require('vm');

// package modules
const axios = require('axios');
const BSON = require('bson');
const consola = require('consola');
const nodemailer = require('nodemailer');
const { KakaoLink } = require('kaling.js');

// custom modules
//const Kaling = require('./modules/kaling.js');
const kakao = require('node-kakao');
const M = require('./modules/common.js');
const dnsPromise = dns.promises;
const searchIndent = require('./modules/indent.js');
const searchAnswer = require('./modules/answer.js');
const ImageAnal = require('./modules/ocr.js');
require('./modules/polling.js');

if ( !fs.existsSync('./chat-stack.json') ) {
	fs.writeFileSync('./chat-stack.json', '{}', { encoding: 'utf8' });
}
if ( !fs.existsSync('./hide-stack.json') ) {
	fs.writeFileSync('./hide-stack.json', '{}', { encoding: 'utf8' });
}
global.chatStack = require('./chat-stack.json');
global.hideStack = require('./hide-stack.json');
const CHAT_REQ_NUM = 100;


// global defins
const config = require('./config.json');
const Long = BSON.Long;
const commandList = require('./modules/cmd.js');
consola.info('Device UUID', config.duuid);
let client = null;
global.ROOT_DIR = __dirname;

consola.info('설정 파일을 읽습니다.');

const sendGmail = (param) => {
	const transOption = {
        service: 'gmail',
        port: 587,
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: config.gmail.mail,
            pass: config.gmail.passwd,
        },
    };
    const transporter = nodemailer.createTransport(transOption);

    const mailOption = {
        from: config.gmail.mail,
        to: param.toEmail,
        subject: param.title,
        html: param.content,
    };

    transporter.sendMail(mailOption, (err, info) => {
        if ( err ) {
            console.error(err);
        } else {
            console.success('Email sent: ' + info.response);
        }
    });
};

const jsSyntax = (code) => {
	try {
		vm.createScript(code);
		return { result: true };
	} catch(err) {
		const sp = err.stack.split('\n');
		const line = sp[0].split(':')[1];
		const syntax = `${sp[1]}\n${sp[2]}`;
		return {
			result: false,
			msg: err.message,
			syntax,
			line,
			stack: err.stack,
		};
	}
};

const checkInValidLink = async (text) => {
	const urls = config["accept-url"];

	//const textUrls = text.match(/http(s*):\/\/[\w|-]\.[\w|\.|-]+/gi);
	const textUrls = text.match(/([a-z0-9_-])+\.([a-z0-9_-]|\.)+/gi);
	if ( textUrls ) {
		for ( turl of textUrls ) {
			const ipMatch = turl.match(/([0-9]|\.)+/g);

			if ( ipMatch ){
				if ( ipMatch[0] === turl ) {
					if ( turl.match(/[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}\.[0-9]{0,3}/) ) {
						consola.info('ip 형식을 감지했습니다.');
					} else {
						consola.info('유효하지 않은 주소입니다. 검사하지 않습니다.');
						continue;
					}
				}
			}

            consola.info(`[${turl}] 을 검사합니다.`);
			try {
				consola.info("Url 을 감지한 것 같습니다. DNS 요청을 보냅니다.");
				await dnsPromise.lookup(turl, { familly: 4, hints: dns.ADDRCONFIG | dns.V4MAPPED });

				let flag = false;
				for ( url of urls ) {
					const regex = new RegExp(url + "$", 'gi');
					const result = turl.match(regex);

					if ( result ) {
						flag = true;
						break;
					}
				}

				if ( !flag && text.length >= 20 ) {
					const res = jsSyntax(text);
					if ( res.result ) {
						consola.success('정상적인 자바스크립트 코드입니다.');
					} else {
						consola.error('허용되지 않은 Url 입니다.');
						return turl;
					}
				} else {
					consola.error('허용되지 않은 Url 입니다.');
					return turl;
				}
			} catch(err) {
				consola.error(err);
                consola.info('DNS Fail.');
			}

		}
        consola.success('허용된 Url 입니다.');
	}
	return false;
};

const psleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

const kakaoLogin = (email, passwd, deviceUUID, name) => {
	return new Promise(async (resolve, rejct) => {
		let res = null;
		client = new kakao.TalkClient(name, deviceUUID)

		try {
			res = await client.login(email, passwd);
			return resolve(res);
		} catch(err) {
			consola.error('로그인 실패!');
			if ( err.status === kakao.KakaoAPI.RequestStatusCode.DEVICE_NOT_REGISTERED ) {
				consola.info('등록되지 않은 디바이스입니다. 등록을 시도합니다.');
			}
		}

		try {
			res = await kakao.KakaoAPI.requestPasscode(email, passwd, deviceUUID, name);
			res = JSON.parse(res);
		} catch(err) {
			consola.error(err);
			res = await kakaoLogin(email, passwd, name);
			return resolve(res);
		}

		if ( res.status === 0 ) {
			consola.success(res);
			const readline = require('readline');
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});

			rl.question('Input passcode:', async (answer) => {
				console.log("Try register device: ", answer);
				try {
					res = await kakao.KakaoAPI.registerDevice(answer, email, passwd, deviceUUID, name);
					res = JSON.parse(res);
					consola.success(res);
				} catch(err) {
					consola.error(res);
				}
				return resolve(await kakaoLogin(email, passwd, deviceUUID, name));
			});
		}
	});
}

const chatRecord = (sender, chat) => {
	const id = sender.user.id.toString();
	let record = chatStack[id];
	/* 채팅 횟수 기록 */
	if ( record === undefined ) {
		record = chatStack[id] = {
			chatCount: 1,
			name: sender.memberStruct.nickname,
			lastChatDate: new Date().toString(),
			firstChatDate: new Date().toString(),
		};
	} else {
		record.chatCount += 1;
		record.lastChatDate = new Date().toString();
		record.name = sender.memberStruct.nickname;
	}
	return record;
}

(async () => {
	const res = await kakaoLogin(config.email, config.passwd, config.duuid, config.name);
	global.kaling = new KakaoLink(config.api.kaling, 'https://sopia-bot.github.io');
	await global.kaling.login(config.email, config.passwd);

	consola.success(`${client.clientUser.mainUserInfo.settings.nickName}(${client.clientUser.id.toString()}) 로 로그인하였습니다.`);

	global.logon = true;
	global.channels = [];
	global.rooms = [];

	if ( fs.existsSync('channels.db') ) {
        consola.info('채널 데이터 정보를 읽습니다.');
		const dbStr = fs.readFileSync('channels.db', { encoding: 'utf8' });
		global.channels = JSON.parse(dbStr);

		for ( channelId of global.channels ) {
			const longId = new Long(channelId.low, channelId.high);

			const channel = client.channelManager.map.get(longId.toString());
			global.rooms.push(channel);

			console.info(`채널 (${longId.toString()}) 정보를 읽었습니다.`);
		}
        consola.success('채널 데이터 정보를 읽는데 성공했습니다.');
	}

	global.assignedUsers = [];

	client.on('message', async (chat) => {
        if ( chat.text === "!등록" ) {
            M.isAdmin(chat)
                .then(() => {
                    const idx = global.channels.findIndex(c => new Long(c.low, c.high).toString() === chat.channel.id.toString());
                    if ( idx >= 0 ) {
                        chat.channel.sendText("이미 등록된 방입니다.");
                        consola.info('이미 등록된 방입니다.');
                        return;
                    }

                    global.channels.push(chat.channel.id);
                    global.rooms.push(chat.channel);
                    try {
                        fs.writeFileSync('channels.db', JSON.stringify(global.channels, null, '\t'), { encoding: 'utf8' });
                        chat.channel.sendText(`[${chat.channel.openLink.linkStruct.linkName}](${chat.channel.id.toString()}) 을(를) 등록했습니다.`);
                        consola.success(`[${chat.channel.openLink.linkStruct.linkName}](${chat.channel.id.toString()}) 을(를) 등록했습니다.`);
                        return;
                    } catch(err) {
                        chat.channel.sendText(`방 등록에 실패했습니다. ${err.message}`);
                        consola.error(err);
                        return;
                    }
                })
                .catch(err => {
                });
            return;
        } else if ( chat.text === "!해제" ) {
            M.isAdmin(chat)
                .then(() => {
                    const idx = global.channels.findIndex(c => new Long(c.low, c.high).toString() === chat.channel.id.toString());
                    if ( idx < 0 ) {
                        chat.channel.sendText("등록되지 않은 방입니다.");
                        consola.info('등록되지 않은 방입니다.');
                        return;
                    }

                    global.channels.splice(idx, 1);

                    const ridx = global.rooms.findIndex(r => r.id.toString() === chat.channel.id.toString());
                    global.rooms.splice(ridx, 1);

                    fs.writeFileSync('channels.db', JSON.stringify(global.channels, null, '\t'), { encoding: 'utf8' });
                    chat.channel.sendText(`방 ${chat.channel.openLink.linkStruct.linkName} (${chat.channel.id}) 를 정상 해지했습니다.`);
                    consola.success(`방 ${chat.channel.openLink.linkStruct.linkName} (${chat.channel.id}) 를 정상 해지했습니다.`);
                });
        } else if ( chat.text.indexOf("!공지") === 0 ) {
			const notice = chat.text.split(' ')[1];
			const chid = chat.channel.Id.toString();
			config.notice[chid] = notice;
			fs.writeFileSync('config.json', JSON.stringify(config, null, '\t'), { encoding: 'utf8' });
			console.log(`공지 채널 ${chid} ID ${notice}를 등록하였습니다.`);
			return;
        }

		if ( !M.isAcceptCheannel(chat.channel) ) {
			return;
		}

		if ( chat instanceof kakao.SinglePhotoChat ) {
			const photo = chat.attachmentList[0];
			const t = await ImageAnal(photo);
			if ( t ) {
				chat.text = t;
			}
		}

		const senderInfo = chat.Channel.getUserInfo(chat.Sender);
		const senderStruct = senderInfo.memberStruct;
		const senderId = senderInfo.user.id.toString();

		const record = chatRecord(senderInfo, chat);
		console.log(`[${chat.LogId}]${senderStruct.nickname}(${senderId}): ${chat.text}`);

		if ( chat.mentionMap.size > 0 ) {
			for ( let [id, mention] of chat.mentionMap ) {
				M.isAdmin(null, mention.UserId)
					.then(() => {
						chat.channel.sendText('관리자에게 연락을 보냅니다.');
						sendGmail({
							toEmail: config['admin-email'],
							title: `[${chat.channel.openLink.linkStruct.linkName}] 에서 호출하였습니다.`,
							content: '튀어 가십쇼',
						});
					});
			}
		}

		if ( record.chatCount >= CHAT_REQ_NUM ) {
			consola.info('채팅이 100회 이상인 유저입니다. 광고 주소 검사를 진행하지 않습니다.');
		} else {
			let invalidUrl = await checkInValidLink(chat.text);
			if ( !invalidUrl ) {
				if ( chat instanceof kakao.CustomChat ) {
					if ( client.clientUser.id.toString() !== senderInfo.user.id.toString() ) {
						invalidUrl = true;
					}
				}
			}
			if ( invalidUrl ) {
				const invalidUrlLen = invalidUrl.length;
				const hideLen = Math.ceil(invalidUrlLen * 0.4);
				let hideUrl = "";
				for ( let i=0;i<invalidUrlLen;i++ ) {
					if ( i < hideLen ) {
						if ( invalidUrl[i] !== '.' ) {
							hideUrl += 'x';
							continue;
						}
					}
					if ( i < invalidUrlLen - 1 ) {
						hideUrl += invalidUrl[i];
					} else {
						hideUrl += 'x';
					}
				}

				try {
					const sender = chat.channel.userInfoMap.get(chat.sender.id.toString()).memberStruct;
					global.hideStack.unshift({
						id: chat.LogId.toString(),
						date: new Date().toJSON(),
						author: {
							id: chat.sender.id.toString(),
							nickname: sender.nickname,
						},
						message: chat.text,
						rm: false,
					});
					if ( global.hideStack.length > 30 ) {
						global.hideStack.pop();
					}
					chat.channel.sendText(`[${sender.nickname}]님이 전송하신 메시지중에 허가되지 않은 주소가 있습니다.\n가리기 및 강제퇴장을 시도합니다.\n\n${hideUrl}`);
					consola.log(`[${sender.nickname}]님이 전송하신 메시지중에 허가되지 않은 주소가 있습니다.\n가리기 및 강제퇴장을 시도합니다.`);
					consola.log(`${chat.text}\n\n`);
					psleep(1000);
					result = await chat.hide();
					if ( result ) {
						result = await chat.channel.kickMember(chat.sender);
						if ( result ) {
							chat.channel.sendText('성공했습니다.');
						} else {
							chat.channel.sendText('실패했습니다.\n3회 더 시도합니다.');

							for ( let i=0;i<3;i++ ) {
								result = await chat.channel.kickMember(chat.sender);
								if ( result ) {
									chat.channel.sendText('성공했습니다.');
									return;
								}
								await psleep(1000);
							}
							chat.channel.sendText('실패했습니다.');
						}
					}
				} catch(err) {
					consola.error(err);
				}
				return;
			}
		}

		if ( M.isCmd(chat) ) {
			cmd = commandList[chat.cmd];
			if ( cmd ) {
                consola.info(`명령어 [${chat.cmd}] 를 실행합니다.`);
				result = M.runCmd(cmd, chat, senderInfo, client);
				if ( result ) {
					if ( typeof result === "string" ) {
						chat.channel.sendText(result);
                        consola.success(`명령어 결과. [${result}]`);
					} else {
                        if ( result.then ) {
                            result.then(msg => {
                                if ( msg ) {
                                    if ( typeof msg === "string" ) {
                                        chat.channel.sendText(msg);
                                        consola.success(`명령어 결과. Promise [${msg}]`);
                                    } else {
                                        chat.channel.sendTemplate(msg);
                                        consola.success(`명령어 결과. Promise Template`);
                                    }
                                }
                            });
                        } else {
                            chat.channel.sendTemplate(result);
                            consola.success(`명령어 결과. Template`);
                        }
					}
				} else {
                    consola.error('명령어 결과를 불러오는 데 실패했습니다.');
                }
			}
		} else {
            const deep = searchIndent(chat.text);
            const answer = searchAnswer(deep);

            let result = "";

			/*
            deep.forEach(d => {
                result += `${d.pos}: ${d.val}\n`;
            });
			*/

            result += answer;

            if ( result.trim() ) {
                consola.success(`자연어 처리입니다. [${chat.text}] -> [${result}]`);
                chat.channel.sendText(result);
            }
        }
	});

    client.on('feed', (chat) => {
		if ( !M.isAcceptCheannel(chat.channel) ) {
			return;
		}

		const feed = chat.getFeed();
        if ( feed.feedType === kakao.FeedType.OPENLINK_JOIN ) {
			const member = feed.members[0];
			const senderInfo = chat.Channel.getUserInfoId(member.userId);
			const senderStruct = senderInfo.memberStruct;
            client.emit('join', chat.channel, senderStruct);
        }
    });

	client.on('join', (channel, user) => {
		const chid = channel.id.toString();
        consola.info(`${channel.openLink.linkStruct.linkName} (${chid}) 에 ${user.nickName} (${user.userId.toString()}) 님이 입장했습니다.`);

		const room = channel.openLink.linkStruct.linkName;
		global.kaling.send(room, {
			template_id: 49971,
			template_args: {
				//user: sender.memberStruct.nickname,
				'THU': user.profileImageUrl,
				'THN': user.nickname,
				'ROOM': room,
			},
		});

		/*
		const attachment = Kaling({
			type: kakao.CustomType.FEED,
			title: `${user.nickName}님 환영합니다!`,
			desc: `공지는 꼭 확인하여 주시기 바랍니다.`,
			link: 'https://sopia-bot.github.io',
			buttonStyle: kakao.CustomButtonStyle.VERTICAL,
			buttons: [
				{
					title: '공지 확인하기',
					dpType: kakao.CustomButtonDisplayType.ALL,
					link: `kakaomoim://post?referer=b&chat_id=${chid}&post_id=${config.notice[chid]}`,
				},
				{
					title: '홈페이지 방문하기',
					dpType: kakao.CustomButtonDisplayType.ALL,
					link: 'https://sopia-bot.github.io/',
				},
				{
					title: '노션 페이지는 여기',
					dpType: kakao.CustomButtonDisplayType.ALL,
					link: 'https://www.notion.so/cfddd1655efc4801bfb407dc4af0cd98',
				},
				{
					title: '개발자 블로그',
					dpType: kakao.CustomButtonDisplayType.ALL,
					link: 'https://ifthe1201.blog.me/',
				},
			],
			thumbnails: [
				{
					url: 'https://sopia-bot.github.io/%EB%A8%B8%EA%B7%B8%EC%BB%B5.jpg',
					style: kakao.CustomImageCropStyle.ORIGINAL,
				},
			],
		});
		channel.sendTemplate(attachment);
		*/
	});
})();
