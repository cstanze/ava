const Discord = require('discord.js')
const fs = require('fs')

module.exports = {
  name: 'niggalations',
  description: 'get a quote from the niggalations bible',
  type: 'Fun',
  async execute(client, msg, args) {
    let quotes = await fs.readFileSync('./niggalations.txt').toString()
    quotes = quotes.split('\n')
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    const quoteSection = randomQuote.split(`--LOCATION--`)[1]
    msg.channel.send(`> ${randomQuote.split(`--LOCATION--`)[0]}\n> ${quoteSection}`)
  }
}
