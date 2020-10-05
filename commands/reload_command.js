const fs = require('fs')
const { didYouMeanCustom } = require('../util/didyoumean.js')
const chalk = require('chalk')

module.exports = {
  name: 'reload_command',
  description: 'Reloads a command file',
  type: 'Private',
  aliases: ['rcommand'],
  permissionsLevel: 'Bot Admin',
  async execute(client, msg, args) {
    if(!args.length) return msg.channel.send(`You didn't pass any command to reload, ${msg.author}`)
    msg.channel.send(`Reloading the following commands: \`${args.join(' ')}\``).then(async msg => {
      for(let i=0;i<args.length;i++) {
        const commandName = args[i].toLowerCase()
        const command = msg.client.commands.get(commandName)
                    ||  msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
        commandFiles = commandFiles.map(c => c.replace('.js', ''))
        if(!command) {
          msg.channel.send(`There is no command with name or alias \`${commandName}\`\nDid You Mean: ***${didYouMeanCustom(commandName, commandFiles)}***`)
          console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command]`), chalk.white(`[Reload]`), chalk.red(`[Failure]`), newCommand.name)
          continue
        }
        delete require.cache[require.resolve(`./${command.name}.js`)]
        try {
          const newCommand = require(`./${command.name}.js`)
          msg.client.commands.set(newCommand.name, newCommand)
          console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command]`), chalk.white(`[Reload]`), chalk.green(`[Success]`), newCommand.name)
          msg.channel.send(`Command \`${command.name}\` was reloaded`)
        } catch (error) {
          console.error(error);
          msg.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``)
          console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command]`), chalk.white(`[Reload]`), chalk.red(`[Failure]`), args[i], error.message)
        }
      }
      msg.delete()
    })
  }
}
