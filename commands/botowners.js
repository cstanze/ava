const AsciiTable = require('ascii-table')

module.exports = {
  name: 'botowners',
  description: 'Get a nice formatted table of all the botowners of Ava!',
  useMySQL: true,
  execute(client, msg, args, con) {
    if(args[0] == null) {
			con.query(`SELECT * FROM bot_admins;`, (err, res, fields) => {
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
		} else {
			con.query(`SELECT * FROM bot_admins WHERE userId = ${args[0]};`, (err, res, fields) => {
				let hasResults = false
				try {
					if(res[0].id != null) hasResults = true
				} catch {
					hasResults = false
				}
				let table = new AsciiTable("Bot Owners")
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
