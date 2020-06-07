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


// global defins
const client = new kakao.TalkClient('youn');
const Long = BSON.Long;
const config = require('./config.json');


const commandList = {
    "등록": (chat) => {
		M.isAdmin(chat)
			.then(() => {
				const idx = global.channels.findIndex(c => c.toNumber() === chat.channel.id.toNumber());
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

const sendToAllChannels = (msg) => {
	let sender = "sendText";
	if ( msg ) {
		if ( typeof msg === "string" ) {
			sender = "sendText";
		} else {
			sender = "sendTemplate";
		}
	} else {
		return;
	}

	for ( channel of global.rooms ) {
		channel[sender](msg);
	}
};

const createRecommandLives = async () => {
	const livesRes = await axios.get('https://kr-api.spooncast.net/lives/discovered/');
	const lives = livesRes.data.results;

	const list = [];
	for ( live of lives ) {
		if ( live.title.includes("팅") === false ) {
			list.push({
				title: live.title,
				desc: `${live.author.nickname.trim()} | 👤 ${live.member_count} ❤ ${live.like_count}`,
				link: `https://www.spooncast.net/kr/live/${live.id}`,
				thumb: {
					url: live.img_url,
					style: kakao.CustomImageCropStyle.ORIGINAL,
				},
			});

			if ( list.length >= 5 ) {
				break;
			}
		}
	}
	const attachment = Kaling({
		type: kakao.CustomType.LIST,
		header: {
			title: `추천하는 방송`,
			link: 'https://www.spooncast.net/kr/',
			bg: 'https://www.spooncast.net/kr_share_default.png',
		},
		list,
	});
	return attachment;
};

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

	global.poll = {
		sec:  0,
		min:  0,
		hour: 0,
		day:  0,
		__lc: {
			sec:  -1,
			min:  -1,
			hour: -1,
			day:  -1,
		},
		checker(type, num) {
			if ( this[type] !== this.__lc[type] ) {
				if ( this[type] % num === 0 ) {
					this.__lc[type] = this[type];
					return true;
				}
			}
			return false;
		},
	};
	global.interval = setInterval(async () => {

		global.poll.sec += 1;
		if ( global.poll.sec > 0 && global.poll.sec%60 === 0 ) {
			global.poll.min += parseInt(global.poll.sec / 60, 10);
			global.poll.sec = 1;
		}

		if ( global.poll.min > 0 && global.poll.min%60 === 0 ) {
			global.poll.hour += parseInt(global.poll.min / 60, 10);
			global.poll.min = 1;
		}

		if ( global.poll.hour > 0 && global.poll.hour%24 === 0 ) {
			global.poll.day += parseInt(global.poll.hour / 24, 10);
			global.poll.hour = 1;
		}

		const { sec, min, hour, day } = global.poll;

		if ( global.poll.checker('min', 1) ) {
			//const crlTemplate = await createRecommandLives();
			//sendToAllChannels(crlTemplate);
		}

	}, 1000);

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
