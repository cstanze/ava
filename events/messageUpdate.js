const Discord = require('discord.js')
// Send to message update to the mod-log

module.exports = async (client, oldMessage, newMessage) => {
  try {
    if(oldMessage.channel.type != 'text') return
    if(oldMessage.author.bot) return
    if(oldMessage.content == newMessage.content) return
    const settings = await client.getSettings(oldMessage.guild)
    const channel = oldMessage.guild.channels.cache.find(c => c.name == settings.mdl)
    if(typeof channel == 'undefined') return
    if(channel.guild.id == '264445053596991498') return
    if(channel.guild.id == `124622509881425920`) return
    if(channel.parent && channel.parent.id == '758777413718114369') return
    const editEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message edited in** <#${oldMessage.guild.channels.cache.find(c => c.name == newMessage.channel.name).id}> [Jump to Message](${newMessage.url})`)
      .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({ size: 512, dynamic: true }))
      .addField('Before', oldMessage.content || ' ')
      .addField('After', newMessage.content || ' ')
      .setFooter(`Message: ${newMessage.id} | User ID: ${newMessage.author.id}`)
      .setTimestamp()
      .setColor('#2578d8')
    channel.send(editEmbed)
  } catch(e) {
    return console.log(e)
  }
}
