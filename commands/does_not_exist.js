const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'does_not_exist',
  aliases: ['tpdns', 'this_person_does_not_exist', 'non_exist', 'thispersondoesnotexist', 'doesnotexist'],
  description: 'Generate an image from thispersondoesnotexist.com',
  type: 'Fun',
  async execute(client, msg, args) {
    try {
      const target = msg.mentions.members.first() || msg.member
      msg.channel.send(`Trying to find an image of someone that doesn't exist...`).then(async mxg => {
        const ipadImg = await (await fetch(`https://thispersondoesnotexist.com/image?${Number(new Date())}`)).blob()
        //console.log(ipadImg.stream())
        const attachment = new Discord.MessageAttachment(ipadImg.stream(), `does_not_exist_${require("crypto").createHash("sha512").update((new Date()).toLocaleString()).digest("hex")}.png`)
        //console.log(attachment)
        msg.channel.send('This person **does not exist**: ', attachment).catch(_ => {
          console.log(_)
          msg.channel.send(`<a:folded:799741765765955605> Uh oh! This person ***really*** doesn't exist. We couldn't generate an image`)
        })
        mxg.delete()
      }).catch(_ => {
        console.log(_)
        msg.channel.send(`<a:folded:799741765765955605> Uh oh! This person ***really*** doesn't exist. We couldn't generate an image`)
      })
    } catch(e) {
      console.log(e)
      msg.channel.send(`<a:folded:799741765765955605> Uh oh! This person ***really*** doesn't exist. We couldn't generate an image`)
    }
  }
}
