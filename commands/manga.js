const Anilist = require('anilist-node')
const anilist = new Anilist()
const Discord = require('discord.js')

module.exports = {
  name: 'manga',
  description: 'Search for an manga by their name! Get some information!',
  cooldown: 15,
  args: true,
  usage: '<manga name>',
  example: 'Jahy-sama Won\'t be Discouraged!',
  type: 'Search',
  async execute(client, msg, args) {
    args[0] = args.join(' ')
    msg.channel.send(`:compass: Searching for manga with name: \`${args[0]}\`.`).then(async mxg => {
      const search = await anilist.search('manga', args[0])
      if(typeof search.media[0] == 'undefined') return msg.edit(`Couldn't find the manga: \`${args[0]}\``)
      const anime = await anilist.media.manga(search.media[0].id)
      const tags = []
      anime.tags.map((tag) => {
        if(!tag.isMediaSpoiler) tags.push(tag.name)
      })
      let animeDescription = anime.description.replace(/<[^>]*>?/gm, '')
      if(animeDescription.length > 1024) {
        animeDescription = `${anime.description.replace(/<[^>]*>?/gm, '').substring(0, 1020)}...`
      }
      const animeEmbed = new Discord.MessageEmbed()
        .setColor('#8074d2')
        .setTitle(anime.title.native || anime.title.romaji || anime.title.english)
        .setURL(anime.siteUrl)
        .setThumbnail(anime.coverImage.large)
        .addField('Score', `${(anime.meanScore / 10).toFixed(1)} / 10`, true)
        .addField('Release Date', `${anime.startDate.month}-${anime.startDate.day}-${anime.startDate.year}\n(Month-Day-Year)`, true)
        .addField('Genres', anime.genres.join(', '))
        .addField('Description', animeDescription)
        .addField('Tags', tags.join(', '))
        .addField(`Titles`, `**Native:** ${anime.title.native}\n**Romaji:** ${anime.title.romaji}\n**English:** ${anime.title.english}`)
        .setFooter(
          `Requested by: ${mxg.author.tag} | Provided by: anilist.co`,
          mxg.author.avatarURL({ format: 'png' })
        )
        .setTimestamp()
      mxg.channel.send(animeEmbed)
      return msg.delete()
    })
  }
}
