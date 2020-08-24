exports.isAdmin = (chat, sender) => {
	// unguis1@naver.com
	//const adminId = { low: -1000804380, high: 28493638, unsigned: false };
	//{ low: -2074546204, high: 24875177, unsigned: false }
	const adminId = [ '122379246648225764', '106838073917632484' ];

	const senderId = sender || chat.sender.id;

	return new Promise((resolve, reject) => {
		if ( adminId.includes(senderId.toString()) ) {
			resolve();
			return;
		}

		let roomAdminId = {};
		chat.channel.client.openChatManager.getLinkOwner(chat.channel.linkId)
			.then(chatUser => {
				roomAdminId = chatUser.id;
				if (roomAdminId.toString() === senderId.toString() ) {
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

exports.sendToChannel = (channel, msg) => {
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

	for ( ch of global.rooms ) {
		if ( ch.id.toString() === channel.id.toString() ) {
			channel[sender](msg);
			return;
		}
	}
};

exports.isAcceptCheannel = (channel) => {
	for ( ch of global.rooms ) {
		if ( ch.id.toString() === channel.id.toString() ) {
			return true;
		}
	}
	return false;
};
