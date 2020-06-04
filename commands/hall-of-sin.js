const Discord = require('discord.js')

module.exports = {
  name: 'hall-of-sin',
  description: 'Hall of Sin Feature',
  aliases: ['sinboard'],
  type: 'Feature Docs',
  cooldown: 7,
  nsfw: false,
  usage: '',
  featureSpecials: { emojiName: "sin", related: ["starboard"] },
  execute(client, msg, args) {
    let command = this
    let commandDetails = new Discord.MessageEmbed()
      .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
      .setColor("#8074d2")
      .setDescription(`This is the ${command.name} feature documentation! You can create a new channel named: ***${command.name}*** and create a new emoji with the name: ***${command.featureSpecials.emojiName}***. React to a message with that emoji and then it will be saved to the new ***${command.name}*** channel! Just a small feature. Related to the **${command.featureSpecials.related[0]}** feature`)
      .setTitle(`Feature Name: ${command.name}`)
      .attachFiles(['./AvaIcon.jpg'])
      .setThumbnail('attachment://AvaIcon.jpg')
      .setAuthor(`Ava Command Details`, 'attachment://AvaIcon.jpg')
      .setTimestamp()
      .addFields(
        { name: 'Description', value: `${command.description}`, inline: false },
        { name: 'Usage', value: `\`${msg.prefix}${command.name}${command.usage || ""}\``, inline: false },
        { name: 'Cooldown', value: `${command.cooldown || 3} second(s)`, inline: true },
        { name: 'NSFW', value: `${typeof command.nsfw == "boolean"? (command.nsfw ? "Yes" : "Yes") : "Yes"}`, inline: true }
      )
    msg.channel.send(commandDetails)
  }
}
