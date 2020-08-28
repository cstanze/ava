const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
  name: 'commands',
  description: 'Command searching',
  usage: '<command_type>',
  aliases: ['help', 'command'],
  cooldown: 5,
  type: 'Utility',
  execute(client, msg, args) {
    const data = 'Here\'s a list of all my commands filtered by type:'
    const commandsArr = msg.client.commands.array()

    if(!args.length) {
      let filteredByType = {}
      for(const command of commandsArr) {
        let commandType = command.type || 'Uncategorized'
        filteredByType[commandType] += `${command.name}, `
      }
      let finalMsg = ""
      for(let [key, value] of Object.entries(filteredByType)) {
        if(key == 'Private' && msg.member.user.permLevel != 10) continue
        finalMsg += `${emojiForKey(key)} **${key}**\n\`\`\`${value.replace("undefined", "").trim().slice(0, -1)}\`\`\`\n`
      }
      return msg.author.send(data)
        .then(() => {
          msg.author.send(finalMsg)
          msg.author.send(`\nYou can send \`${msg.prefix}help <command name>\` to get info on a specific command!`)
          if(msg.channel.type == 'dm') return;
          msg.reply('I\'ve sent you a DM with all my commands!')
        })
        .catch(err => {
          console.error(`Could not send help DM to ${msg.author.tag}.\n`, err)
          msg.reply('It seems as though I couldn\'t DM you. Do you have DMs disabled?')
        })
    }
    const name = args[0].toLowerCase()
    const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name))

    if(!command) {
      let commandFilesTMP = fs.readdirSync('.')
      let commandFiles
      commandFilesTMP.forEach(f => {
        commandFiles.push(f.split('.')[0])
      })
      if(commandFiles.includes(name) && msg.author.permLevel == 10) return msg.channel.send(`This command wasn't loaded due to an error. Try reloading the command and checking logs for more info.`)
      return msg.reply(`Hmm... \`${name}\` doesn't seem to be a valid command.`)
    }
    let commandDetails = new Discord.MessageEmbed()
      .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
      .setColor("#8074d2")
      .setTitle(`Details for: ${command.name}`)
      .setThumbnail(client.user.avatarURL({ size: 512, dynamic: true, format: "png" }))
      .setAuthor(`Ava Command Details`, client.user.avatarURL({ size: 128, dynamic: true, format: "png" }))
      .setTimestamp()
      .addFields(
        { name: 'Aliases', value: `${typeof command.aliases == "undefined" ? 'None' : command.aliases.join(", ")}`, inline: true },
        { name: 'Description', value: `${command.description}`, inline: true },
        { name: 'Usage', value: `\`${msg.prefix}${command.name} ${command.usage || ""}\``, inline: false },
        { name: 'Example', value: `\`${msg.prefix}${command.name} ${command.example || ""}\``, inline: false },
        { name: 'Cooldown', value: `${command.cooldown || 3} second(s)`, inline: true },
        { name: 'NSFW', value: `${typeof command.nsfw == "boolean"? (command.nsfw ? "Yes" : "No") : "No"}`, inline: true }
      )
      msg.channel.send(commandDetails)
  }
}

emojiForKey = key => {
  let keys = ['Moderation', 'Fun', 'Misc', 'Image', 'Currency', 'Emoji', 'Private', 'Utility', 'NSFW', 'Music', 'Settings', 'Text']
  if(key == 'Moderation') return ":shield:"
  if(key == 'Fun') return ":smiley:"
  if(key == 'NSFW') return ":smirk:"
  if(key == 'Misc') return ":neutral_face:"
  if(key == 'Image') return ":frame_photo:"
  if(key == 'Currency') return ":moneybag:"
  if(key == 'Emoji') return ":smile:"
  if(key == 'Private') return ":lock:"
  if(key == 'Utility') return ":wrench:"
  if(key == 'Music') return ":loud_sound:"
  if(key == 'Settings') return ":gear:"
  if(key == 'Text') return ":regional_indicator_t:"
  if(key == 'User') return '<:blush_eoto:693817007979757589>'
  if(key == 'Search') return ':compass:'
  if(key == 'Uncategorized') return ':question:'
  return ":grey_question:"
}
