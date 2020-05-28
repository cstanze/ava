const fs = require('fs')
const { didYouMeanCustom } = require('../helpers/didYouMean.js')
const chalk = require('chalk')
const db = require('quick.db')

module.exports = {
  name: 'permissionsfor',
  description: 'Gets the required permissions level for a command.',
  type: 'Utility',
  aliases: ['commandperms', 'permsfor'],
  async execute(client, msg, args, con) {
    if(!args.length) return msg.channel.send(`You did you pass any command to get the permissions of, ${msg.author}`)
    msg.channel.send(`Finding permissions for: \`${args.join(' ')}\``).then(async msg => {
      for(let i=0;i<args.length;i++) {
        const commandName = args[i].toLowerCase()
        const command = msg.client.commands.get(commandName)
                    ||  msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
        commandFiles = commandFiles.map(c => c.replace('.js', ''))
        if(!command) {
          msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}\nDid You Mean: ***${didYouMeanCustom(commandName, commandFiles)}***`)
          console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command]`), chalk.white(`[Reload]`), chalk.red(`[Failure]`), newCommand.name)
          continue
        }
        console.log(msg.author.level)
        const friendly = client.config.permLevels.find(l => l.level == msg.author.permLevel).name
        msg.channel.send(`Permissions Required For \`${commandName}\`: \`${command.permissionsLevel}\`\nYour permissions level: ${friendly}`)
      }
      msg.delete()
    })
    return
  }
}
