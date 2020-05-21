const fs = require('fs')
const { didYouMeanCustom } = require('../helpers/didYouMean.js')

module.exports = {
  name: 'reload_command',
  description: 'Reloads a command file',
  useMySQL: true,
  type: 'Private',
  aliases: ['rcommand'],
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
            if(!args.length) return msg.channel.send(`You did you pass any command to reload, ${msg.author}`)
            for(let i=0;i<args.length;i++) {
              const commandName = args[i].toLowerCase()
              const command = msg.client.commands.get(commandName)
                          ||  msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
              let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
              commandFiles = commandFiles.map(c => c.replace('.js', ''))
              if(!command) {
                return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}\nDid You Mean: ***${didYouMeanCustom(commandName, commandFiles)}***`)
              }
              delete require.cache[require.resolve(`./${command.name}.js`)]
              try {
                const newCommand = require(`./${command.name}.js`)
                msg.client.commands.set(newCommand.name, newCommand)
                msg.channel.send(`Command \`${command.name}\` was reloaded`)
              } catch (error) {
                console.error(error);
                msg.channel.send(`There was an error while reload a command \`${command.name}\`:\n\`${error.message}\``)
              }
            }
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
