const kakao = require('../node-kakao');
const M = require('./common.js');
const Kaling = require('./kaling.js');
const BSON = require('bson');
const Long = BSON.Long;
const fs = require('fs');

module.exports = {
    "등록": (chat) => {
		console.log(chat);
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
	},
	"멘션": (chat) => {
		const mention = new kakao.ChatMention(chat.sender);
		chat.channel.sendText(mention);
	},
	"feed": (chat) => {
		chat.channel.sendRichFeed(chat.content);
	},
	"템": (chat) => {
		const attachment = Kaling({
			type: kakao.CustomType.FEED,
			title: `환영합니다!`,
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
		chat.channel.sendTemplate(attachment);
	},
};
