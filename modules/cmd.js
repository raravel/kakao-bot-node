const kakao = require('@storycraft/node-kakao');
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
};
