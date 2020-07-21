const Discord = require('discord.js')
// Send to message delete to the mod-log

module.exports = async (client, message) => {
  try {
    if(message.channel.type != 'text') return
    if(message.author.bot) return
    const settings = client.getSettings(message.guild)
    const channel = await message.guild.channels.cache.find(c => c.name == settings.modLogChannel)
    const deleteEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message sent by** <@${message.author.id}> **deleted in** <#${channel.id}>\n${message.content}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 512, dynamic: true }))
      .setFooter(`User ID: ${message.author.id} | Message ID: ${message.id}`)
      .setTimestamp()
      .setColor('#ff1100')
    channel.send(deleteEmbed)
  } catch(e) {
    return
  }
}
