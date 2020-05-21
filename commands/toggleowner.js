const { fetchMemberWithId } = require('../helpers/fetchMember.js')
const AsciiTable = require('ascii-table')

module.exports = {
  name: 'toggleowner',
  description: 'Toggle a bot owner (this command is for botowners only)',
  useMySQL: true,
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
					if(res[i].userId == args.userId) {
						noAdminFound = false
						break;
					}
				}
				if(isVerified && noAdminFound) {
					let username = null
					fetchMemberWithId(msg.guild, args[0]).then(user => {
						username = user.user.username
						con.query(`INSERT INTO bot_admins (username, userId, timestamp) VALUES (\"${username}\", \"${args[0]}\", \"${new Date().toDateString()}\")`, (err, r,f) => {
							if(err) {
								console.error(err)
								return;
							}
							msg.channel.send(":tada: Created Owner! :tada:")
						})
					})
				} else if(isVerified && !noAdminFound) {
					con.query(`DELETE FROM bot_admins WHERE userId=\"${args[0]}\"`, (e, r, f) => {
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
