const { handleCommandDocuments } = require('../handlers/commands.js')
const { prefix } = require('../config.json')
let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Command searching',
  usage: '<command_type>',
  aliases: ['commands'],
  cooldown: 5,
  execute(client, msg, args) {
    const data = []
    const { commands } = msg.client

    if(!args.length) {
      data.push('Here\'s a list of all my commands:')
      data.push(`\`\`\`\n${commands.map(command => command.name).join(', ')}\`\`\``)
      data.push(`\nYou can send \`${msg.prefix}help <command name>\` to get info on a specific command!`)

      return msg.author.send(data, { split: true })
        .then(() => {
          if(msg.channel.type == 'dm') return;
          msg.reply('I\'ve sent you a DM with all my commands!')
        })
        .catch(err => {
          console.error(`Could not send help DM to ${msg.author.tag}.\n`, err)
          msg.reply('It seems as though I couldn\'t DM you. Do you have DMs disabled?')
        })
    }
    const name = args[0].toLowerCase()
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

    if(!command) {
      return msg.reply(`Hmm... \`${name}\` doesn't seem to be a valid command.`)
    }
    let commandDetails = new Discord.MessageEmbed()
      .setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)])
      .setColor("#8074d2")
      .setTitle(`Details for: ${command.name}`)
      .attachFiles(['./AvaIcon.jpg'])
      .setThumbnail('attachment://AvaIcon.jpg')
      .setAuthor(`Ava Command Details`, 'attachment://AvaIcon.jpg')
      .setTimestamp()
      .addFields(
        { name: 'Aliases', value: `${typeof command.aliases == "undefined" ? 'None' : command.aliases.join(", ")}`, inline: false },
        { name: 'Description', value: `${command.description}`, inline: false },
        { name: 'Usage', value: `\`${msg.prefix}${command.name} ${command.usage || ""}\``, inline: false },
        { name: 'Cooldown', value: `${command.cooldown || 3} second(s)`, inline: true },
        { name: 'NSFW', value: `${typeof command.nsfw == "boolean"? (command.nsfw ? "Yes" : "No") : "No"}`, inline: true }
      )
      msg.channel.send(commandDetails)
  }
}
