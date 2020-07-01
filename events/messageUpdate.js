const Discord = require('discord.js')
// Send to message update to the mod-log

module.exports = async (client, oldMessage, newMessage) => {
  try {
    if(oldMessage.channel.type != 'text') return
    newMessage = await newMessage.channel.messages.fetch(newMessage.id)
    const settings = client.getSettings(oldMessage.guild)
    const channel = await oldMessage.guild.channels.cache.find(c => c.name == settings.modLogChannel)
    const editEmbed = new Discord.MessageEmbed()
      .setDescription(`**Message edited in** <#${channel.id}> [Jump to Message](${newMessage.url})`)
      .setAuthor(newMessage.author.tag, newMessage.author.displayAvatarURL({ size: 512, dynamic: true }))
      .addField('Before', oldMessage.content || ' ')
      .addField('After', newMessage.content || ' ')
      .setFooter(`User ID: ${newMessage.author.id}`)
      .setTimestamp()
      .setColor('#2578d8')
    channel.send(editEmbed)
  } catch(e) {
    return
  }
}
