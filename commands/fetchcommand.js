const fs = require('fs')
const { didYouMeanCustom } = require('../helpers/didyoumean.js')
const chalk = require('chalk')

module.exports = {
  name: 'fetchcommand',
  description: 'Fetches and Reloads a new command file. Forks off to reload_command if command is already cached',
  type: 'Private',
  aliases: ['fcommand'],
  permissionsLevel: 'Bot Owner',
  async execute(client, msg, args) {
    if(!args.length) return msg.channel.send(`You did you pass any command to reload, ${msg.author}`)
    msg.channel.send(`Fetching and Reloading the following commands: \`${args.join(' ')}\``).then(async msg => {
      for(let i=0;i<args.length;i++) {
        const commandName = args[i].toLowerCase()
        const command = msg.client.commands.get(commandName)
                    ||  msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
        if(command) {
          client.commands.get('reload_command').execute(client, msg, [args[i]])
          continue
        }
        let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
        commandFiles = commandFiles.map(c => c.split('.js')[0])
        if(!commandFiles.includes(args[i])) {
          msg.channel.send(`Command \`${args[i]}\` does not exist`)
          continue
        }
        delete require.cache[require.resolve(`./${args[i]}.js`)]
        try {
          const newCommand = require(`./${args[i]}.js`)
          client.commands.set(newCommand.name, newCommand)
          console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command]`), chalk.white(`[Reload]`), chalk.green(`[Success]`), newCommand.name)
          msg.channel.send(`Command \`${args[i]}\` was reloaded`)
        } catch (error) {
          console.error(error)
          msg.channel.send(`There was an error while reloading a command \`${args[i]}\`:\n\`${error.message}\``)
          console.log(chalk.blue('[Ava]'), chalk.yellow(`[Command]`), chalk.white(`[Reload]`), chalk.red(`[Failure]`), args[i], error.message)
        }
      }
      msg.delete()
    })
  }
}
