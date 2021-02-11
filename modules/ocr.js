const axios = require('axios');
const got = require('got');
const consola = require('consola');

const config = require('../config.json');

const ocr = async (photoAttachment) => {
	try {
		consola.info('이미지 파일을 분석합니다.');
		const buf = await got(photoAttachment.ImageURL).buffer();
		const b64 = buf.toString('base64');
		const { data } = await axios({
			url: 'https://vision.googleapis.com/v1/images:annotate?alt=json&key=' + config.api.ocr,
			method: 'post',
			data: {
				requests: {
					image: {
						content: b64,
					},
					features: [
						{
							type: 'TEXT_DETECTION',
						}
					],
				},
			},
		});

		const text = data.responses[0].fullTextAnnotation.text;
		consola.info('이미지 파일 분석 결과: ' + text);
		return text;
	} catch(err) {
		consola.error('이미지 분석 실패', err);
	}
}

module.exports = ocr;
