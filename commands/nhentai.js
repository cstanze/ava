const nhentai = require('nhentai-js')
const Discord = require('discord.js')

module.exports = {
  name: 'nhentai',
  description: 'Search for nhentai information using nhentai doujin numbers',
  type: 'Search',
  nsfw: true,
  usage: '<doujin number>',
  example: '177013',
  args: true,
  async execute(client, msg, args) {
    const number = args[0]
    if (!nhentai.exists(number)) return msg.channel.send(':warning: no hentai found...');
    const doujin = await nhentai.getDoujin(number)
    const embed = new Discord.MessageEmbed()
      .setTitle(doujin.title)
      .setURL(doujin.link)
      .setThumbnail(doujin.thumbnails[0])
      .addField(
        'Artist',
        doujin.details.artists.map((artist) => artist.split('(')[0].trim()).join(', '),
      )
      .addField('Tags', doujin.details.tags.map((tags) => tags.split('(')[0].trim()).join(', '))
      .setFooter(
        `Requested by: ${msg.author.tag} | Provided By: nhentai.net`,
        msg.author.avatarURL({ format: 'png', dynamic: true }),
      )
      .setTimestamp()
    return msg.channel.send(embed)
  }
}
