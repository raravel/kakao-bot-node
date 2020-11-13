const M = require('./common.js');
const axios = require('axios');
const kakao = require('node-kakao');
const Kaling = require('./kaling.js');
const consola = require('consola');

const recommandBlackList = [
	4113440, // 박룰루
	1249214, // 사랑해 여왕
];

const rand = (num=0, min=0) => Math.floor(Math.random() * (num)) + min;
const MAX_LIVE_NUM = 300;

const getAllPopularLive = async () => {
	let list = [];
	let reqUrl = 'https://kr-api.spooncast.net/lives/popular/?page_size=12&is_adult=0';
	do {
		const res = await axios.get(reqUrl);

		for ( live of res.data.results ) {
			if (
				recommandBlackList.includes(live.author.id) ||
				!!live.title.match(/팅|리럽|홍방|홍보/) === true
			) {
				continue;
			}
			list.push(live);

			if ( list.length >= MAX_LIVE_NUM ) {
				break;
			}
		}

		reqUrl = res.data.next;
	} while ( reqUrl && list.length < MAX_LIVE_NUM );

	return list;
};

const createRecommandLives = async () => {
	const lives = await getAllPopularLive();
	const MAX_LIVE_RECOMMAND = 5;

	const list = [];
	for ( let i=0;i < MAX_LIVE_RECOMMAND;i++ ) {
		const idx = rand(lives.length);
		const live = lives.splice(idx, 1)[0];

		list.push({
			title: live.title,
			desc: `${live.author.nickname.trim()} | 👤 ${live.member_count} ❤ ${live.like_count}`,
			//link: `https://www.spooncast.net/kr/live/${live.id}`,
			link: {
				'LPC': `https://www.spooncast.net/kr/live/${live.id}`,
				'LMO': `https://www.spooncast.net/kr/live/${live.id}`,
				'LCA': `spooncast://?live_id=${live.id}`,
				'LCI': `spooncast://?live_id=${live.id}`,
			},
			thumb: {
				url: live.img_url,
				style: kakao.CustomImageCropStyle.ORIGINAL,
			},
		});
	}

	const attachment = Kaling({
		type: kakao.CustomType.LIST,
		header: {
			title: `지금, 이런 방송은 어때요?`,
			link: 'https://www.spooncast.net/kr/',
			bg: 'https://www.spooncast.net/kr_share_default.png',
		},
		list,
	});
	return attachment;
};

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

	if ( !global.logon ) {
		return;
	}

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

	if ( global.poll.checker('hour', 3) ) {
		const crlTemplate = await createRecommandLives();
		M.sendToAllChannels(crlTemplate);
        consola.success('등록된 모든 방에, 방송 추천을 전송했습니다.');
	}

}, 1000);
