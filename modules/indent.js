/////////////////////////////////////////////////////////////////////
//                       의도 추론 (indent)                        //
////////////////////////////////////////////////////////////////////
    /*
    의도 추론이란, 입력 문장이 어떤 의도인지 분류하기 위한 기준입니다.
    key: 의도타입 입니다.
    indent: 의도를 가름하는 정규식입니다.
    sub-indent: 하위 의도를 가리키는 오브젝트입니다.
    각 배열의 아이템은 정규식이 될 수 있습니다.
    */

const indentList = [
    {
        "key": "serial",
        "indent": [ "시리얼", "발급.*(key|키)" ],
        "pos": "subject",
        "sub-indent": [
            {
                "key": "what",
                "pos": "interrogative",
                "indent": ["뭔\\S+", "무엇\\S+", "뭐\\S+"],
                "finish": true,
            },
            {
                "key": "info",
                "pos": "subject",
                "indent": ["정보\\S+"],
                "sub-indent": [
                    {
                        "key": "not-have",
                        "pos": "verb",
                        "indent": [ "없\\S+" ],
                        "finish": true,
                    },
                ],
            },
            {
                "key": "search",
                "pos": "verb",
                "indent": ["잃\\S+", "일어\\S+", "찾\\S+"],
                "finish": true,
            },
            {
                "key": "issued",
                "pos": "a-verb",
                "indent": [ "발급", "발행" ],
                "sub-indent": [
                    {
                        "key": "how",
                        "pos": "adjective",
                        "indent": [ "어떠\\S", "어떡\\S", "어떻\\S" ],
                        "sub-indent": [
                            {
                                "key": "take",
                                "pos": "verb",
                                "indent": [ "받\\S+", "해\\S+", "하\\S+" ],
                                "finish": true,
                            },
                        ],
                    },
                ],
            },
            {
                "key": "how",
                "pos": "adjective",
                "indent": [ "어떠\\S", "어떡\\S", "어떻\\S" ],
                "sub-indent": [
                    {
                        "key": "take",
                        "pos": "verb",
                        "indent": [ "받\\S+", "해\\S+", "하\\S+" ],
                        "finish": true,
                    },
                ],
            },
			{
				"key": "diffrent",
				"pos": "adjective",
				"indent": [ "다른" ],
				"sub-indent": [
					{
						"key": "user",
						"pos": "verb",
						"indent": [ "유저", "사람" ],
						"sub-indnet": [
							{
								"key": "assign",
								"pos": "verb",
								"indent": [ "할당", "사용" ],
								"finish": true,
							},
						],
					},
				],
			},
        ],
    }, // serial
    {
        "key": "login",
        "pos": "subject",
        "indent": ["로그인", "login", "Login", "LOGIN", "LOgin"],
        "sub-indent": [
            {
                "key": "sign",
                "pos": "subject",
                "indent": ["인증"],
                "sub-indent": [
                    {
                        "key": "not-match",
                        "pos": "adjective",
                        "indent": ["다르\\S+", "틀리\\S+"],
                        "sub-indent": [
                            {
                                "key": "logout",
                                "pos": "verb",
                                "indent": ["튕\\S+", "팅기\\S+", "팅겨\\S+"],
                                "finish": true,
                            },
                        ],
                    },
                    {
                        "key": "match",
                        "pos": "adjective",
                        "indent": ["일치", "맞\\S+"],
                        "sub-indent": [
                            {
                                "key": "not",
                                "pos": "verb",
                                "indent": ["않\\S+"],
                                "finish": true,
                            },
                        ],
                    },
                ],
            },
        ],
    }, // login
    {
        "key": "save",
        "pos": "subject",
        "indent": ["저장", "save", "세이브"],
        "sub-indent": [
            {
                "key": "how",
                "pos": "interrogative",
                "indent": [ "어떠\\S", "어떡\\S", "어떻\\S" ],
                "finish": true,
            },
        ],
    }, // save
    {
        "key": "event",
        "pos": "subject",
        "indent": ["인사(\\S+|)", "입장(\\S+|)", "좋아요(\\S+|)", "하트(\\S+|)", "명령어(\\S+|)"],
        "sub-indent": [
            {
                "key": "change",
                "pos": "verb",
                "indent": [ "바꾸(\\S+|)", "바꿔(\\S+|)", "수정(\\S+|)", "추가(\\S+|)" ],
                "finish": true,
            },
        ],
    },
	{
		"key": "google",
		"pos": "subject",
		"indent": ["google", "구글", "GOOGLE", "Google"],
		"sub-indent": [
			{
				"key": "login",
				"pos": "subject",
				"indent": ["로그인", "login", "Login"],
				"sub-indent": [
					{
						"key": "none-safe",
						"pos": "adjective",
						"indent": ["안전하지"],
						"finish": true,
					},
				],
			},
		],
	}, // google
];

const searchIndent = (msg, indent = indentList, deep = []) => {
    for ( let id of indent ) {
        if ( deep[deep.length - 1] && deep[deep.length - 1].key === "." ) {
            break;
        }

        for ( let regxStr of id.indent ) {
            if ( deep[deep.length - 1] && deep[deep.length - 1].key === "." ) {
                break;
            }

            const regx = new RegExp(regxStr);
            const result = msg.match(regx);
            if ( result ) {
                if ( typeof id['sub-indent'] === "object" ) {
                    const len = deep.length;
                    const t_res = searchIndent(msg.substr(result.index), id['sub-indent'], deep);
                }

                if ( id.finish ) {
                    deep.push({ key: ".", val: "끝", pos: 'finish' });
                }

                if ( deep[deep.length - 1] && deep[deep.length - 1].key === "." ) {
                    deep.unshift({ key: id.key, val: result[0], pos: id.pos });
                }
            }
        }
    }
    return deep;
};

module.exports = searchIndent;
