const AsciiTable = require('ascii-table')

module.exports = {
  name: 'botmods',
  description: 'Get a nice formatted table of all the botmods of Ava!',
  useMySQL: true,
  type: 'Misc',
  usage: '<user id> (optional)',
  execute(client, msg, args, con) {
    if(args[0] == null) {
			con.query(`SELECT * FROM bot_mods;`, (err, res, fields) => {
				let hasResults = false
				try {
					if(res[0].id != null) hasResults = true
				} catch {
					hasResults = false
				}
				let table = new AsciiTable("Bot Moderators")
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
		} else {
			con.query(`SELECT * FROM bot_mods WHERE userId = ${args[0]};`, (err, res, fields) => {
				let hasResults = false
				try {
					if(res[0].id != null) hasResults = true
				} catch {
					hasResults = false
				}
				let table = new AsciiTable("Bot Moderators")
					.setHeading('id', 'username (cached)', 'userId', 'coronation date')
				if(hasResults) {
					for(var i=0;i<res.length;i++) {
						table.addRow(res[i].id, res[i].username, res[i].userId, res[i].timestamp)
					}
				} else {
					table.addRow('0', 'No Users Found', 'No Users Found', 'January 1st 1970')
				}
				msg.channel.send(`\`\`\`\n${table.toString()}\`\`\``)
			})
		}
  }
}
