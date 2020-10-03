const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'fact',
  description: 'Get a random fact!',
  type: 'Fun',
  async execute(client, msg, args) {
    const fact = await (await fetch(`https://nekos.life/api/v2/fact`)).json()
    msg.channel.send(`**Fun Fact: **${fact.fact}`)
  }
}
