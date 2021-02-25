const nhentai = require('nhentai-js')
const Discord = require('discord.js')

module.exports = {
  name: 'nhentai',
  description: 'Search for nhentai information using nhentai doujin numbers',
  type: 'Search',
  nsfw: true,
  usage: '<doujin number>',
  example: '91988',
  args: true,
  async execute(client, msg, [number]) {
    if (!nhentai.exists(number)) return msg.channel.send(':warning: no doujin found...');
    const doujin = await nhentai.getDoujin(number)
    const embed = new Discord.MessageEmbed()
      .setTitle(doujin.title)
      .setURL(doujin.link)
      .setAuthor(msg.author.tag, msg.author.avatarURL({ format: 'png', dynamic: true }))
      .setThumbnail(doujin.thumbnails[0])
      .addField(
        'Artist(s)',
        doujin.details.artists 
        ? doujin.details.artists.map((artist) => artist.split('(')[0].trim()).join(', ')
        : 'unknown',
        true
      )
      .addField('Languages', doujin.details.languages.join(', '), true)
      .addField('Pages', doujin.details.pages[0], true)
      .addField('Uploaded', doujin.details.uploaded[0], true)
      .addField('Alternate Title', doujin.nativeTitle)
      .addField('Categories', doujin.details.categories.join(', '), true)
      .addField('Tags', doujin.details.tags.map((tags) => tags.split('(')[0].trim()).join(', '))
      .setFooter(
        `Provided By: nhentai.net`,
        `https://i.imgur.com/uLAimaY.png`,
      )
      .setTimestamp()
    return msg.channel.send(embed)
  }
}
