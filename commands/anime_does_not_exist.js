const totalImages = 100_000
const psi = ["0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"]
const genanimeID = () => Math.floor(Math.random() * totalImages)
const genanimeSrc = (given_psi, id) => `https://www.thisanimedoesnotexist.ai/results/psi-${given_psi}/seed${id}.png`
const Discord = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
  name: 'anime_does_not_exist',
  aliases: ['tadns', 'this_anime_does_not_exist', 'thisanimedoesnotexist', 'animedoesnotexist'],
  description: 'Generate an image from thisanimedoesnotexist.ai',
  usage: '<creativity>',
  example: '1.3',
  type: 'Fun',
  async execute(client, msg, [chosen_psi, ..._args]) {
    try {
      if(!psi.includes(chosen_psi || '1.0')) return msg.channel.send(`Please choose a creativity level from the following: ${client.code('', psi.join(", "))}\n**Note:** the value must be exact. It won't work otherwise.`)
      const target = msg.mentions.members.first() || msg.member
      msg.channel.send(`Trying to find an image of an anime that doesn't exist...`).then(async mxg => {

        const ipadImg = await (await fetch(
          genanimeSrc(
            chosen_psi || '1.0',
            genanimeID()
          )
        )).blob()
        // console.log(ipadImg.stream())
        const attachment = new Discord.MessageAttachment(ipadImg.stream(), `nonexistant_anime_${require("crypto").createHash("sha512").update((new Date()).toLocaleString()).digest("hex")}.png`)
        // console.log(attachment)
        msg.channel.send('This anime **does not exist**: ', attachment).catch(_ => {
          console.log(_)
          msg.channel.send(`<a:folded:799741765765955605> Uh oh! This anime ***really*** doesn't exist. We couldn't generate an image`)
        })
        mxg.delete()
      }).catch(_ => {
        console.log(_)
        msg.channel.send(`<a:folded:799741765765955605> Uh oh! This anime ***really*** doesn't exist. We couldn't generate an image`)
      })
    } catch(e) {
      console.log(e)
      msg.channel.send(`<a:folded:799741765765955605> Uh oh! This anime ***really*** doesn't exist. We couldn't generate an image`)
    }
  }
}
