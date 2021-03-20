const kakao = require('node-kakao');
const M = require('./common.js');
const Kaling = require('./kaling.js');
const BSON = require('bson');
const Long = BSON.Long;
const fs = require('fs');
const axios = require('axios');
const spoon = require('sopia-core');

const sopia = new spoon.Client();

module.exports = {
    "등록인원": async (chat) => {
        const res = await axios.get('https://us-central1-sopia-bot.cloudfunctions.net/usersNum');
        return `현재 ${res.data}명이 소피아를 사용중입니다.`;
    },
    "시리얼": async (chat) => {
		const help = "\n\n\n사용법: !시리얼 [발급받은 고유닉]";
        let tag = chat.content.trim();
        if ( !tag ) {
            return "명령어 뒤에 닉네임을 붙여야 합니다." + help;
        }

        if ( tag.replace(/([A-Z]|[a-z]|[0-9]|\.|_)+/, "").trim() ) {
			const res = await sopia.searchManager.searchUser(tag);
			if ( res.data.length > 0 ) {
				tag = res.data[0].tag;
			} else {
				return "고유 닉네임 형식이 맞지 않습니다." + help;
			}
        }

        const serial = await axios.get(`https://us-central1-sopia-bot.cloudfunctions.net/findSerial/${tag}`);
        return serial.data;
    },
	"검색": async (chat) => {
		let content = chat.content.trim();
		if ( !content ) {
			return '검색 내용을 입력해 주세요.';
		}

		const search = await axios({
			url: 'https://www.googleapis.com/customsearch/v1',
			method: 'get',
			params: {
				key: 'AIzaSyDt6E9fMznkhnnmLC1oHCfk1l2MOpAXBl8',
				cx: '17ebd155c9ef08018',
				q: `site:sopia-bot.github.io ${content}`,
			},
		});

		if ( search.status === 200 ) {
			const data = search.data;
			const items = data.items;

			if ( !items) {
				return '검색 결과가 없습니다.';
			}

			const kData = Kaling({ type: kakao.CustomType.CAROUSEL }, true);
			kData['C'] = {
				'CTP': kakao.CustomType.FEED,
				'CIL': [],
			};
			const cil = kData['C']['CIL']

			for ( const item of items ) {
				console.log(item.pagemap);
				let imgUrl = 'https://sopia-bot.github.io/머그컵.jpg';
				if ( item.pagemap.cse_image ) {
					if ( Array.isArray(item.pagemap.cse_image) ) {
						const img = item.pagemap.cse_image[0];
						if ( typeof img === 'object' && img.src ) {
							imgUrl = img.src;
						}
					}
				}
				const d = Kaling({
					type: kakao.CustomType.FEED,
					title: item.title,
					desc: item.snippet,
					link: `https://sopia-bot.github.io/`,
					buttonStyle: kakao.CustomButtonStyle.VERTICAL,
					buttons: [
						{
							title: '글 확인하기',
							dpType: kakao.CustomButtonDisplayType.ALL,
							link: item.link,
						},
					],
					thumbnails: [
						{
							url: imgUrl,
							style: kakao.CustomImageCropStyle.ORIGINAL,
						},
					],
				}, true);
				cil.push(d['C']);
			}

			console.log(kData);

			const kaling = new kakao.CustomAttachment();
			kaling.readAttachment(kData);

			const template = new kakao.AttachmentTemplate(kaling);
			chat.channel.sendTemplate(template);
		} else {
			console.error(search);
		}
	},
	"포스트": async (chat, sender, client) => {
		const api = await client.openChannelBoard.requestPostList(chat.channel.LinkId, chat.channel.Id);
		let res = "[공지 목록]";
		res += "\u200b".repeat(500) + "\n\n\n";
		if ( Array.isArray(api.posts) ) {
			api.posts.forEach((post,idx) => {
				const p = JSON.parse(post.content)[0];
				let txt = "미리보기를 지원하지 않는 공지입니다.";

				if ( p.type === "text" ) {
					if ( p.text.length >= 50 ) {
						txt = p.text.substr(0, 50) + '...';
					} else {
						txt = p.text;
					}
				}

				res += `${idx}. ${new Date(post.created_at).toLocaleString()}에 작성된 포스트\n`;
				res += `  - ID: ${post.id}\n`;
				res += `  - 타입: ${post.object_type}\n`;
				res += `  - 작성자: ${chat.Channel.getUserInfoId(post.owner_id).memberStruct.nickname}\n`;
				res += `  - 미리보기: ${txt}\n`;
				res += `\n`;
			});
		}
		return res.trim();
	},
	"삭제": async (chat, sender, client) => {
		let rtn = '';
		switch ( chat.channel.getMemberType(sender) ) {
			case kakao.OpenMemberType.OWNER:
			case kakao.OpenMemberType.MANAGER:
			default:
				if ( chat.Type === kakao.ChatType.Reply ) {
					const logId = chat.Reply.SourceLogId;
					const idx = global.hideStack.findIndex((c) => c.id === logId.toString());
					const rmChat = global.hideStack[idx];
					if ( idx === -1 ) {
						rtn = '삭제 명단에 없는 메시지입니다.';
					} else {
						rtn = `[삭제] 명령어로 메시지(${rmChat.id})를 삭제합니다.`;
						chat.channel.hideChatId(Long.fromString(rmChat.id));
						chat.hide();
						rmChat.rm = true;
					}
				} else {
					if ( chat.content ) {
						const idx = parseInt(chat.content)-1;
						rtn = `[삭제] 명령어로 메시지(${global.hideStack[idx].id})를 삭제합니다.`;
						chat.channel.hideChatId(Long.fromString(global.hideStack[idx].id));
						chat.hide();
						global.hideStack[idx].rm = true;
					} else {
						rtn = '[삭제된 채팅 목록]';
						rtn += "\u200b".repeat(500) + "\n\n\n";
						rtn += '✍ 삭제할 메시지 번호를 적거나 답장해 주세요..\n';
						rtn += '  메시지는 최근순부터 정렬되어 보여집니다.\n\n\n';

						global.hideStack.forEach((hchat, idx) => {
							rtn += `${idx + 1}. ${new Date(hchat.date).toLocaleString()}에 가려진 채팅.\n`;
							rtn += `  - 작성자: ${hchat.author.nickname}\n`;
							rtn += `  - 채팅 ID: ${hchat.id}\n`;
							if ( hchat.rm ) {
								rtn += `  - 직접 삭제한 메시지\n`;
							}
							rtn += '\n';
						});
					}
				}
				break;
		}
		return rtn.trim();
	},
	"테스트": async (chat, sender, client) => {
		const room = chat.channel.openLink.linkStruct.linkName;
		await global.kaling.send(room, {
			template_id: 49971,
			template_args: {
				//user: sender.memberStruct.nickname,
				'THU': sender.memberStruct.profileImageUrl,
				'THN': sender.memberStruct.nickname,
				'ROOM': room,
			},
		});
	},
};
