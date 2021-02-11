const kakao = require('node-kakao');

const L = (link) => {
	if ( typeof link === 'object' ) {
		return link;
	}

	return {
		'LCP': link,
		'LCM': link,
		'LCA': link,
		'LCI': link,
	}
};

const createKaling = (options, json = false) => {
	const kaling = new kakao.CustomAttachment();


	const btns = [];

	if ( options.buttons ) {
		for ( btn of options.buttons ) {
			if ( typeof btn.link === 'string' ) {
				btn.link = {
					'LPC':btn.link,
					'LMO':btn.link,
					'LCA':btn.link,
					'LCI':btn.link,
				};
			}
			btns.push({
				'BU': {
					'T':  btn.title,
					'SR': btn.dpType,
					'SNM': 'SOPIA',
				},
				'L': btn.link,
			});
		}
	}

	const thumbs = [];

	if ( options.thumbnails ) {
		for ( t of options.thumbnails ) {
			thumbs.push({
				'TH': {
					'THU': t.url,
					'W': t.width,
					'H': t.height,
					'SC': t.style,
				},
			});
		}
	}

	const data = {
		'P': {
			'TP': options.type,
			'ME': '소피아가 보낸 메시지입니다.',
			'SNM': 'SOPIA',
			'VA': '6.0.0',
			'VI': '5.9.8',
			'VW': '2.5.1',
			'VM': '2.2.0',
			'SID': '1234',
			'DID': '4321',
		},
		'K': {
			'ai': '428114',
			'lv': '4.0',
			'ak': '6792b69c4f4d142350d0a14b529663dc',
			'av': '1.0',
			'ti': '29757',
		},
	};

	const C = {
		'PR': {
			'TD': {
				'T': '개발자 윤군',
			},
			'L': L('https://www.spooncast.net/kr/profile/4376423'),
			'BG': {
				'THU': 'https://kr-cdn.spooncast.net/profiles/8/zv8NX8ubBxx30/4f36f881-70a6-4dcc-acb3-f4848d49f485.jpg',
				'SC': kakao.CustomImageCropStyle.ORIGINAL,
			},
			'TH': {
				'THU': 'https://kr-cdn.spooncast.net/profiles/8/zv8NX8ubBxx30/4f36f881-70a6-4dcc-acb3-f4848d49f485.jpg',
				'SC': kakao.CustomImageCropStyle.ORIGINAL,
			},
		},
		'L': L('https://www.spooncast.net/kr/profile/4376423'),
	};

	if ( btns.length > 0 ) {
		C['BUT'] = options.buttonStyle;
		C['BUL'] = btns;
	}

	if ( options.title || options.desc ) {
		if ( !C['TI'] ) {
			C['TI'] = {};
		}

		C['TI']['TD'] = {
			'T': options.title || '',
			'D': options.desc || '',
		};
	}

	if ( options.link ) {
		if ( !C['TI'] ) {
			C['TI'] = {};
		}

		C['TI']['L'] = L(options.link);
	}


	if ( options.header ) {
		C['HD'] = {
			'TD': {
				'T': options.header.title || '',
				'D': options.header.desc || '',
			},
			'L': L(options.header.link),
			'BG': {
				'THU': options.header.bg,
				'SC': options.header.bgStyle || kakao.CustomImageCropStyle.ORIGINAL,
			},
		};
	}

	if ( options.list ) {
		C['ITL'] = [];
		for ( l of options.list ) {
			C['ITL'].push({
				'TD': {
					'T': l.title,
					'D': l.desc,
				},
				'L': L(l.link),
				'TH': {
					'THU': l.thumb.url,
					'SC': l.thumb.style || kakao.CustomImageCropStyle.ORIGINAL,
					'W': l.thumb.width,
					'H': l.thumb.height,
				}
			});
		}
	}




	if ( thumbs.length > 0 ) {
		C['THC'] = thumbs.length;
		C['THL'] = thumbs;
	}

	data['C'] = C;

	if ( options.social ) {
		C['SO'] = {
			'LK': options.social.like,
			'CM': options.social.comment,
			'SH': options.social.share,
			'VC': options.social.view,
			'SB': options.social.subscriber
		};
	}

	if ( json ) {
		return data;
	}

	kaling.readAttachment(data);
	return new kakao.AttachmentTemplate(kaling);
};

module.exports = createKaling;
