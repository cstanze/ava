const fs = require('fs')
const { didYouMeanCustom } = require('../helpers/didyoumean.js')
const db = require('quick.db')

module.exports = {
  name: 'fetchcommand',
  description: 'Fetches & Reloads a new command file',
  useMySQL: true,
  type: 'Private',
  aliases: ['fcommand'],
  permissionsLevel: 'Bot Owner',
  async execute(client, msg, args, con) {
    let id = msg.member.user.id
    if(!args.length) return msg.channel.send(`You did you pass any command to reload, ${msg.author}`)
    const commandName = args[0]
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    for(const file of commandFiles) {
      const command = require(`./${file}`)
      client.commands.set(command.name, command)
    }
    const command = msg.client.commands.get(commandName)
                ||  msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    console.log(command)
    if(!command) {
      return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${msg.author}\nDid You Mean: ***${didYouMeanCustom(commandName, commandFiles)}***`)
    }
    delete require.cache[require.resolve(`./${command.name}.js`)]
    try {
      const newCommand = require(`./${command.name}.js`)
      msg.client.commands.set(newCommand.name, newCommand)
      msg.channel.send(`Command \`${command.name}\` was fetched & reloaded`)
    } catch (error) {
      console.error(error);
      msg.channel.send(`There was an error while reload a command \`${command.name}\`:\n\`${error.message}\``)
    }
  }
}
