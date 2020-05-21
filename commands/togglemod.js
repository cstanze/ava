const { fetchUserWithId } = require('../helpers/fetchMember.js')
const AsciiTable = require('ascii-table')

module.exports = {
  name: 'togglemod',
  description: 'Toggle a bot mod (this command is for botowners only)',
  useMySQL: true,
  type: 'Private',
  execute(client, msg, args, con) {
    let id = msg.member.user.id
		con.query('SELECT * FROM bot_admins;', (err, res, fields) => {
			let hasResults = false
			try {
				if(res[0].id != null) hasResults = true
			} catch {
				hasResults = false
			}
			if(hasResults) {
				let isVerified = false
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == id) {
						isVerified = true
						break;
					}
				}
				let noAdminFound = true
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == args[0]) {
						noAdminFound = false
						break;
					}
				}
				if(isVerified && noAdminFound) {
					let username = null
					fetchUserWithId(client, args[0]).then(user => {
						username = user.username
						con.query(`INSERT INTO bot_mods (username, userId, timestamp) VALUES (\"${username}\", \"${args[0]}\", \"${new Date().toDateString()}\")`, (err, r,f) => {
							if(err) {
								console.error(err)
								return msg.channel.send(`Couldn't Create Mod. Check Error Logs`)
							}
							msg.channel.send(":tada: Created Mod! :tada:")
						})
					})
				} else if(isVerified && !noAdminFound) {
					con.query(`DELETE FROM bot_mods WHERE userId=\"${args[0]}\"`, (e, r, f) => {
						if(e) {
							console.error(e)
							return;
						}
						msg.channel.send("Deleted Owner! :confounded:")
					})
				} else {
					msg.channel.send(":laughing: You're not a bot admin...")
				}
			}
		})
  }
}
