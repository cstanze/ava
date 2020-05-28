let randomFooters = ["Proudly created in nano", "Puppers!", ":O", "CPU Overheating...", "Quacc", "Welcome Cthulu!", "NYU Tisch", "Widen That Keyhole...", "01000110"]
const Discord = require('discord.js')
const fetch = require('node-fetch')
const fs = require('fs')
const util = require('util')
const streamPipeline = util.promisify(require('stream').pipeline)

module.exports = {
  name: 'satan',
  description: 'Someone said you\'re satan. I hope he actually means Stan. Also, Hi Stan!',
  type: 'Image',
  async execute(client, msg, args) {
    const target = msg.mentions.members.first() || msg.member
    msg.channel.send(`Checking the satan status of ${target.nickname || target.user.username}...`).then(async mxg => {
      let image = await fetch(`http://localhost:65535/api/satan?avatar1=${target.user.avatarURL({ size: 512, dynamic: false })}`)
      if(image.ok) {
        await streamPipeline(image.body, fs.createWriteStream('./tmp.png'))
      } else {
        mxg.delete()
        return msg.channel.send(`Something went wrong. Try again later?`)
      }
      let embed = new Discord.MessageEmbed()
  		.setColor('#14c49e')
  		.setTitle(`So, it wasn't a urban legend.`)
      .attachFiles(['./tmp.png'])
  		.setImage(`attachment://tmp.png`)
  		.setTimestamp()
  		.setFooter(randomFooters[Math.floor(Math.random() * randomFooters.length)], null)
  		await msg.channel.send(embed)
      mxg.delete()
    })
  }
}
