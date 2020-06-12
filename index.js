// native modules
const fs = require('fs');
const crypto = require('crypto');
const dns = require('dns');

// package modules
const axios = require('axios');
const BSON = require('bson');

// custom modules
const Kaling = require('./modules/kaling.js');
const kakao = require('./node-kakao');
const M = require('./modules/common.js');
const dnsPromise = dns.promises;
//require('./modules/polling.js');


// global defins
const client = new kakao.TalkClient('youn');
const Long = BSON.Long;
const config = require('./config.json');
const commandList = require('./modules/cmd.js');

const checkInValidLink = async (text) => {
	const urls = config["accept-url"];

	//const textUrls = text.match(/http(s*):\/\/[\w|-]\.[\w|\.|-]+/gi);
	const textUrls = text.match(/[a-z|-]+\.[a-z|\.]+/gi);
	
	if ( textUrls ) {
		for ( turl of textUrls ) {
			try {
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

				if ( !flag ) {
					return turl;
				}
			} catch {
			}

		}
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

(async () => {
	const res = await client.login(config.email, config.passwd, config.duuid, true);

	global.channels = [];
	global.rooms = [];

	if ( fs.existsSync('channels.db') ) {
		const dbStr = fs.readFileSync('channels.db', { encoding: 'utf8' });
		global.channels = JSON.parse(dbStr);

		for ( channelId of global.channels ) {
			const longId = new Long(channelId.low, channelId.high);
			
			const channel = client.channelManager.cacheMap.get(longId.toString());
			global.rooms.push(channel);
		}
	}

	global.assignedUsers = [];

	client.on('message', async (chat) => {
        if ( chat.text === "!등록" ) {
            M.isAdmin(chat)
                .then(() => {
                    const idx = global.channels.findIndex(c => new Long(c.low, c.high).toNumber() === chat.channel.id.toNumber());
                    if ( idx >= 0 ) {
                        chat.channel.sendText("이미 등록된 방입니다.");
                        return;
                    }

                    global.channels.push(chat.channel.id);
                    global.rooms.push(chat.channel);
                    try {  
                        fs.writeFileSync('channels.db', JSON.stringify(global.channels, null, '\t'), { encoding: 'utf8' });
                        chat.channel.sendText(`[${chat.channel.channelInfo.name}](${chat.channel.id.toNumber()}) 을(를) 등록했습니다.`);
                        return;
                    } catch(err) {
                        chat.channel.sendText(`방 등록에 실패했습니다. ${err.message}`);
                        return;
                    }
                })
                .catch(err => {
                });
            return;
        }

		if ( !M.isAcceptCheannel(chat.channel) ) {
			return;
		}

		let invalidUrl = await checkInValidLink(chat.text);
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

			chat.channel.sendText(`${chat.sender.nickname}님이 전송하신 메시지중에 허가되지 않은 주소가 있습니다.\n가리기 및 강제퇴장을 시도합니다.\n\n${hideUrl}`);
			result = await chat.channel.hideChat(chat);
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
			return;
		}

		if ( M.isCmd(chat) ) {
			cmd = commandList[chat.cmd];
			if ( cmd ) {
				result = M.runCmd(cmd, chat);
				if ( result ) {
					if ( typeof result === "string" ) {
						chat.channel.sendText(result);
					} else {
                        if ( result.then ) {
                            result.then(msg => {
                                if ( msg ) {
                                    if ( typeof msg === "string" ) {
                                        chat.channel.sendText(msg);
                                    } else {
                                        chat.channel.sendTemplate(msg);
                                    }
                                }
                            });
                        } else {
                            chat.channel.sendTemplate(result);
                        }
					}
				}
			}
		}
	});

	client.on('join', (channel, user) => {
		if ( !M.isAcceptCheannel(channel) ) {
			return;
		}

		const attachment = Kaling({
			type: kakao.CustomType.FEED,
			title: `${user.nickName}님 환영합니다!`,
			desc: `공지는 꼭 확인하여 주시기 바랍니다.`,
			link: 'https://sopia-bot.github.io',
			buttonStyle: kakao.CustomButtonStyle.VERTICAL,
			buttons: [
				{
					title: '홈페이지 방문하기',
					dpType: kakao.CustomButtonDisplayType.ALL,
					link: 'https://sopia-bot.github.io/',
				},
				{
					title: '릴리즈 노트 확인하기',
					dpType: kakao.CustomButtonDisplayType.ALL,
					link: 'https://sopia-bot.github.io/release/',
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
	});
})();
