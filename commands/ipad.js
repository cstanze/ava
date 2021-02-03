const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'ipad',
  description: 'Tim Apple Cook is now drawing a user\'s pfp...',
  type: 'Fun',
  async execute(client, msg, args) {
    try {
      const target = msg.mentions.members.first() || msg.member
      msg.channel.send(`<:TimGun:801810953976938556> Waiting for Tim "Apple" Cook to draw ${target.displayName}'s avatar...`).then(async mxg => {
        const ipadImg = await (await fetch(`http://localhost:65535/api/ipad?avatar1=${encodeURIComponent(target.user.displayAvatarURL({ format: 'png' }))}`)).blob()
        const attachment = new Discord.MessageAttachment(ipadImg.stream(), 'ipad.png')
        msg.channel.send(attachment).catch(_ => {
          console.log(_)
          msg.channel.send(`<a:folded:799741765765955605> Uh oh! Tim "Apple" Cook had some issues drawing ${target.displayName}'s avatar.`)
        })
        mxg.delete()
      }).catch(_ => {
        console.log(_)
        msg.channel.send(`<a:folded:799741765765955605> Uh oh! Tim "Apple" Cook had some issues drawing ${target.displayName}'s avatar.`)
      })
    } catch(e) {
      console.log(e)
      msg.channel.send(`<a:folded:799741765765955605> Uh oh! Tim "Apple" Cook had some issues drawing ${target.displayName}'s avatar.`)
    }
  }
}
