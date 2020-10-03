const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'why',
  description: 'Question something...',
  type: 'Fun',
  async execute(client, msg, args) {
    const why = await (await fetch(`https://nekos.life/api/v2/why`)).json()
    msg.channel.send(`**${why.why}**`)
  }
}
