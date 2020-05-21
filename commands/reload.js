module.exports = {
  name: 'reload',
  description: 'Reloads the AvaSharder process. (temporarily disables all instances of Ava)',
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
				for(let i=0;i<res.length;i++) {
					if(res[i].userId == id) {
						msg.channel.send('Reloading AvaSharder Process...').then(() => {
							require('child_process').execSync('pm2 reload AvaSharder --update-env')
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
