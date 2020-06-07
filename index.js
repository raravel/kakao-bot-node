// native modules
const fs = require('fs');
const crypto = require('crypto');

// package modules
const axios = require('axios');
const BSON = require('bson');

// custom modules
const Kaling = require('./modules/kaling.js');
const kakao = require('./node-kakao');
const M = require('./modules/common.js');
//require('./modules/polling.js');


// global defins
const client = new kakao.TalkClient('youn');
const Long = BSON.Long;
const config = require('./config.json');
const commandList = require('./modules/cmd.js');


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


	client.on('message', async (chat) => {
		if ( M.isCmd(chat) ) {
			cmd = commandList[chat.cmd];
			if ( cmd ) {
				result = M.runCmd(cmd, chat);
				if ( result ) {
					if ( typeof result === "string" ) {
						chat.channel.sendText(result);
					} else {
						chat.channel.sendTemplate(result);
					}
				}
			}
		}
	});

	client.on('join', (channel, user) => {
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
