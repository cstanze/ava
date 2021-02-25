const totalImages = 100_000
const genWaifuID = () => Math.floor(Math.random() * totalImages)
const genWaifuSrc = (id) => `https://www.thiswaifudoesnotexist.net/example-${id}.jpg`
const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
  name: 'waifu_does_not_exist',
  aliases: ['twdns', 'this_waifu_does_not_exist', 'thiswaifudoesnotexist', 'waifudoesnotexist'],
  description: 'Generate an image from thiswaifudoesnotexist.net',
  type: 'Fun',
  async execute(client, msg, args) {
    try {
      const target = msg.mentions.members.first() || msg.member
      msg.channel.send(`Trying to find an image of a waifu that doesn't exist...`).then(async mxg => {

        const ipadImg = await (await fetch(genWaifuSrc(genWaifuID()))).blob()
        // console.log(ipadImg.stream())
        const attachment = new Discord.MessageAttachment(ipadImg.stream(), `nonexistant_waifu_${require("crypto").createHash("sha512").update((new Date()).toLocaleString()).digest("hex")}.jpg`)
        // console.log(attachment)
        msg.channel.send('This waifu **does not exist**: ', attachment).catch(_ => {
          console.log(_)
          msg.channel.send(`<a:folded:799741765765955605> Uh oh! This waifu ***really*** doesn't exist. We couldn't generate an image`)
        })
        mxg.delete()
      }).catch(_ => {
        console.log(_)
        msg.channel.send(`<a:folded:799741765765955605> Uh oh! This waifu ***really*** doesn't exist. We couldn't generate an image`)
      })
    } catch(e) {
      console.log(e)
      msg.channel.send(`<a:folded:799741765765955605> Uh oh! This waifu ***really*** doesn't exist. We couldn't generate an image`)
    }
  }
}
