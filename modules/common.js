exports.isAdmin = (chat) => {
	// unguis1@naver.com
	//const adminId = { low: -1000804380, high: 28493638, unsigned: false };
	const adminId = 122379246648225760;
	const senderId = chat.sender.id;

	return new Promise((resolve, reject) => {

	if ( senderId.toNumber() === adminId ) {
		resolve();
		return;
	}

	let roomAdminId = {};
	chat.channel.client.openChatManager.getLinkOwner(chat.channel.linkId)
		.then(chatUser => {
			roomAdminId = chatUser.id;
			if (roomAdminId.toNumber() === senderId.toNumber() ) {
				resolve();
			} else {
				reject(new Error('not match admin id'));
			}
		})
		.catch(reject);
	});
}

exports.isCmd = (e) => {
    const sig = "!";
    let msg = e.text;
    if ( msg.indexOf(sig) === 0 ) {
        msg = msg.replace(sig, "");
        e.message = msg;
        e.cmd = msg.split(' ')[0];
        e.isCmd = true;
        e.content = msg.replace(e.cmd, "").trim();
        return true;
    }
    return false;
};


exports.runCmd = (cmd, e) => {
    let str = "";
    switch ( typeof cmd ) {
        case "string": {
            str = cmd;
        } break;
        case "function": {
            str = cmd(e);
        } break;
        case "object": {
            if ( Array.isArray(cmd) ) {
                let result = Math.floor(Math.random() * cmd.length);
                switch ( typeof cmd[result] ) {
                    case "string": {
                        str = cmd[result];
                    } break;
                    case "function": {
                        str = cmd[result](e);
                    }
                }
            }
        } break;
    }
    return str;
};

exports.sendToAllChannels = (msg) => {
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
