/////////////////////////////////////////////////////////////////////
//                       답변 추리 (answer)                        //
////////////////////////////////////////////////////////////////////
/*
	답변 추리란, 현재까지 주워진 데이터와 입력받은 문장 속의 의도를 취합하여 최종적인 대답을 도출해냅니다.
	의도 추론의 결과인 deep 배열에 있는 정보들을 기준으로 각 상황에 맞을법한 문장을 선택하여 조합합니다.
*/

const answerList = [
	{
		"key": "serial",
		"sub-answer": [
			{
				"key": "what",
				"answer": "시리얼은 곧 발급받은 키와 같으며, 소피아 프로그램의 로그인에 필요한 일렬번호입니다.",
			},
			{
				"key": "info",
				"sub-answer": [
					{
						"key": "not-have",
						"answer": "시리얼 키를 잘못 입력하셨습니다.\n시리얼 입력 앞 뒤로 공백이 없는지, 발급한 시리얼과 정확히 일치한지 확인해 주세요.",
					},
				],
			},
			{
				"key": "search",
				"answer": "시리얼을 검색하는 방법은 현재 톡방에서 !시리얼 [발급받은 고유닉] 으로 검색하시면 됩니다.\nex) !시리얼 02x26n",
			},
			{
				"key": "how",
				"sub-answer": [
					{
						"key": "take",
						"answer": "시리얼 키 발급하는 방법을 알려드릴게요.\n\nhttps://sopia-bot.github.io/docs/quick-start/how-to-sign/",
					},
				],
			},
			{
				"key": "diffrent",
				"sub-answer": [
					{
						"key": "user",
						"sub-answer": [
							{
								"key": "assign",
								"answer": "시리얼 번호 및 고유닉네임이 다르기 때문입니다. 고유닉네임엔 @가 포함되지 않아야 하며, 대소문자가 정확해야 하고 앞 뒤 공백이 들어가는 상황이 많으니 다시 확인해 주세요.",
							},
						],
					},
				],
			},
		],
	}, // serial
	{
		"key": "login",
		"sub-answer": [
			{
				"key": "sign",
				"sub-answer": [
					{
						"key": "not-match",
						"sub-answer": [
							{
								"key": "logout",
								"answer": "\"로그인 한 계정과 인증 계정이 다릅니다.\"\n-> 스푼에서 로그인을 하지 않았거나, 로그인 한 계정이 발급받은 소피아 계정을 요청한 요청자 고유닉과 다릅니다.",
							},
						],
					},
					{
						"key": "match",
						"sub-answer": [
							{
								"key": "not",
								"answer": "고유아이디를 잘못 입력하셨습니다.\n입력 앞 뒤로 공백이 없어야 하며, @를 제외하고, 대소문자 정확히 입력해야 합니다.",
							},
						],
					},
				],
			},
		],
	}, // login
	{
		"key": "save",
		"sub-answer": [
			{
				"key": "how",
				"answer": "저장은 Ctrl + S 로 합니다.\n 적용은 F5를 눌러 합니다.\n저장했을 때 왼쪽 아래 \"저장되었습니다.\"가 나오면 성공적으로 저장된 것입니다.\n다른 알림이 뜨면 그것은 코드에 에러가 있는 것입니다.",
			},
		],
	}, // save
	{
		"key": "event",
		"sub-answer": [
			{
				"key": "change",
				"answer": "CODE 탭을 누른 후 왼쪽에 보이는 트리에서, storages 폴더 안 파일들을 수정하시면 됩니다.\n자세한 내용은 블로그 참고 부탁드리요.\n\nhttps://ifthe1201.blog.me/221810647597\n\n" +
				"한 줄 추가하는 코드마저 어려운 당신을 위한 번들이 존재합니다.\nhttps://sopia-bot.github.io/docs/bundle/ez-cmd/",
			},
		],
	}, // event
	{
		"key": "google",
		"sub-answer": [
			{
				"key": "login",
				"sub-answer": [
					{
						"key": "none-safe",
						"answer": "저런, 구글 로그인이 되지 않아 속상하시겠네요.\n아쉽게도 지금은 소피아가 해당 문제를 해결할 수 없습니다. 아래 두 해결방안을 참고해 주세요.\n\n\n1. https://blog.naver.com/daninging/221865278882\n    - 위 블로그를 참고해 로그인이 될 수 있도록 시도해 봅니다.\n\n2. 핸드폰 스푼 앱에서 구글계정을 전화번호, 또는 이메일과 연동시킨 후 소피아에서 연동한 계정으로 로그인합니다.",
					},
				],
			},
		],
	}, // google
];

const searchAnswer = (deep, list = answerList, level = 0) => {
	let answer = "";
	const fidx = deep.findIndex(d => d.pos === "finish");
	if ( fidx !== -1 ) {
		deep.splice(fidx, 1);
	}

	for ( const item of deep ) {
		const idx = list.findIndex((an) => an.key === item.key);
		if ( idx === -1 ) continue;

		const obj = list[idx];

		if ( obj['answer'] ) {
			answer += `${obj['answer']}`;
		} else if ( typeof obj['sub-answer'] === "object" ) {
			const deepDump = [];
			for ( const d of deep ) {
				if ( d !== item ) {
					deepDump.push(d);
				}
			}

			const tempAnswer = searchAnswer(deepDump, obj['sub-answer'], level+1);
			if ( tempAnswer.trim() !== "" ) {
				answer += tempAnswer;
			}
		}
	}

	if ( deep.length === 0 && level > 0 ) {
		list.forEach(l => {
			if ( l['answer'] ) {
				answer += `\n\n${l['answer']}`;
			} else if ( l['sub-answer'] ) {
				answer += searchAnswer(deep, l['sub-answer'], level+1);
			}
		});
	}

	return answer;
};

module.exports = searchAnswer;
