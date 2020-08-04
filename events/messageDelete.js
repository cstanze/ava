const Discord = require('discord.js')
// Send to message delete to the mod-log

module.exports = async (client, message) => {
  try {
    if(message.channel.type != 'text') return
    if(message.author.bot) return
    const settings = await client.getSettings(message.guild)
    const channel = message.guild.channels.cache.find(c => c.name == settings.mdl)
    const deleteEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message sent by** <@!${message.author.id}> deleted in** <#${message.guild.channels.cache.find(c => c.name == message.channel.name).id}>\n${message.content}`)
      .setAuthor(client.user.tag, client.user.displayAvatarURL({ size: 512, dynamic: true }))
      .setFooter(`Message ID: ${message.id}`)
      .setTimestamp()
      .setColor('#ff1100')
    channel.send(deleteEmbed)
  } catch(e) {
    return console.log(e)
  }
}
