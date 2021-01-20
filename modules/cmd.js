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
        let tag = chat.content.trim();
        if ( !tag ) {
            return "명령어 뒤에 닉네임을 붙여야 합니다.";
        }

        if ( tag.replace(/([A-Z]|[a-z]|[0-9]|\.|_)+/, "").trim() ) {
			const res = await sopia.searchManager.searchUser(tag);
			if ( res.data.length > 0 ) {
				tag = res.data[0].tag;
			} else {
				return "고유 닉네임 형식이 맞지 않습니다.";
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
};
