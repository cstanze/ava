let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const Discord = require('discord.js')
const fetch = require('node-fetch')
const fs = require('fs')
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)

module.exports = {
  name: 'ipad',
  description: 'Tim Cook draws you on his iPad',
  type: 'Image',
  async execute(client, msg, args) {
    const target = msg.mentions.members.first() || msg.member
    msg.channel.send(`Drawing ${target.nickname || target.user.username}'s pfp on my iPad... :pencil:`).then(async mxg => {
      let ipadImage = await fetch(`http://localhost:65535/api/ipad?avatar1=${target.user.avatarURL({ size: 512, dynamic: false })}`)
      if(ipadImage.ok) {
        await streamPipeline(ipadImage.body, fs.createWriteStream('./tmp.png'))
      } else {
        mxg.delete()
        return msg.channel.send(`Something went wrong. Try again later?`)
      }
      let ipadEmbed = new Discord.MessageEmbed()
  		.setColor('#14c49e')
  		.setTitle(`Did I draw it correctly?`)
      .attachFiles(['./tmp.png'])
  		.setImage(`attachment://tmp.png`)
  		.setTimestamp()
  		.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
  		await msg.channel.send(ipadEmbed)
      mxg.delete()
    })
  }
}
