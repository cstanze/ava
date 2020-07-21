const Discord = require('discord.js')
// send emoji creation

module.exports = async (client, emoji) => {
  try {
    const settings = client.getSettings(emoji.guild)
    const channel = await emoji.guild.channels.cache.find(c => c.name == settings.modLogChannel)
    const emojiEmbed = new Discord.MessageEmbed()
      .setDescription(emoji.animated ? `<a:${emoji.name}:${emoji.id}>` : `<:${emoji.name}:${emoji.id}>`)
      .setAuthor(`${emoji.guild.name} - Emoji Create`, emoji.guild.iconURL({ size: 512, dynamic: true }))
      .setFooter(`Emoji ID: ${emoji.id}`)
      .setTimestamp()
      .setColor('#2578d8')
    channel.send(emojiEmbed)
  } catch(e) {
    return
  }
}
