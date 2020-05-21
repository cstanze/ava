const AsciiTable = require('ascii-table')
const { fetchUserWithId } = require('../helpers/fetchMember.js')

module.exports = {
  name: 'recacheowners',
  description: 'Recache the usernames of the botowners.',
  useMySQL: true,
  type: 'Private',
  args: true,
  usage: '<user id>',
  aliases: ['ucache', 'cache'],
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
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == id) {
            fetchUserWithId(client, args[0]).then(user => {
              let username = user.username
              con.query(`UPDATE bot_admins SET username=\"${username}\" WHERE userId=\"${args[0]}\"`, (err, res, f) => {
                if(err) {
  								console.error(err)
  								return msg.channel.send(`Couldn't Recache Owner. Check Error Logs`)
  							}
          			con.query(`SELECT * FROM bot_admins;`, (err, res, f) => {
                  let hasResults = false
            			try {
            				if(res[0].id != null) hasResults = true
            			} catch {
            				hasResults = false
            			}
            			let table = new AsciiTable("Bot Owners")
            				.setHeading('id', 'username (cached)', 'userId', 'coronation date')
            			if(hasResults) {
            				for (var i=0; i<res.length;i++) {
            					table.addRow(res[i].id, res[i].username, res[i].userId, res[i].timestamp)
            				}
            			} else {
            				table.addRow('0', 'No Users Found', 'No Users Found', 'January 1st 1970')
            			}
            			msg.channel.send(`\`\`\`\n${table.toString()}\`\`\``)
                })
          		})
            })
						return
					}
				}
				msg.channel.send("You think you're sneaky huh? :laughing:\n You've got to be a bot owner to run this command")
			} else {
				msg.channel.send("Hmm... I couldn't find any admin entries in the database.")
			}
		})
  }
}
