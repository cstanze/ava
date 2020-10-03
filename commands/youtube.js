const Discord = require('discord.js')
const yts = require('youtube-search')
const { gapi_token } = require('../config')
const opts = { maxResults: 3, key: gapi_token }

module.exports = {
  name: 'youtube',
  description: 'Search for a youtube video/playlist!',
  cooldown: 10,
  args: true,
  usage: '<search term>',
  type: 'Search',
  aliases: ['yt'],
  execute(client, msg, args) {
    args = args.join(' ')
    yts(args, opts, (e, r) => {
      if(e) {
        msg.channel.send(`:warning: Uh oh! Some error occured.`)
        return console.log(e)
      }
      msg.channel.send(`Found a result! \`${r[0].title}${r[0].kind == 'youtube#playlist' ? ' - Playlist' : ''}\`\n ${r[0].link}`)
    })
  }
}
