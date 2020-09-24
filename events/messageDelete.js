const Discord = require('discord.js')
// Send to message delete to the mod-log

module.exports = async (client, message) => {
  try {
    if(message.channel.type != 'text') return
    if(message.author.bot) return
    const settings = await client.getSettings(message.guild)
    const channel = message.guild.channels.cache.find(c => c.name == settings.mdl)
    if(typeof channel == 'undefined') return
    if(channel.guild.id == '264445053596991498') return
    if(channel.guild.id == `124622509881425920`) return
    if(channel.parent && channel.parent.id == '758777413718114369') return
    const deleteEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message sent by <@!${message.author.id}> deleted in** <#${message.guild.channels.cache.find(c => c.name == message.channel.name).id}>\n${message.content}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 512, dynamic: true }))
      .setFooter(`Author: ${message.author.id} | Message ID: ${message.id}`)
      .setTimestamp()
      .setColor('#ff1100')
    channel.send(deleteEmbed)
  } catch(e) {
    return console.log(e)
  }
}
