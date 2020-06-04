const randomPuppy = require('random-puppy')
const Discord = require('discord.js')
const fetch = require('node-fetch')
const chalk = require('chalk')
const { attachmentIsImage } = require('../helpers/attachments.js')

module.exports = {
  name: 'succubus',
  description: 'Get some nice succubus from r/succubus (beta)',
  cooldown: 2,
  nsfw: true,
  type: 'NSFW',
  aliases: ['dragongirl'],
  async execute(client, msg, args) {
    let body = await fetch('https://www.reddit.com/r/succubus.json?sort=new&is_self=false&mediaonly=true&showmedia=true').then(res => res.json())
    body = body.data
    const allowed = body.children
    if(!allowed.length) return msg.channel.send('It seems we are out of fresh succubus hentai. Try again later?')
    let randomNumber = Math.floor(Math.random() * allowed.length)
    msg.channel.send(allowed[randomNumber].data.url)
  }
}
