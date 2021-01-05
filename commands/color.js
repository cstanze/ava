const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports = {
  name: 'color',
  description: 'Get solid color image from a color.',
  usage: '<color>',
  args: true,
  type: 'Image',
  execute(client, msg, args) {
    const colorSize = 128
    for(const color of args) {
      try {
        const clr = `#${Discord.Util.resolveColor(color).toString(16)}`
        const canvas = Canvas.createCanvas(colorSize, colorSize)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = clr
        ctx.fillRect(0, 0, canvas.width, canvas.width)
        let solidColor = new Discord.MessageAttachment(canvas.toBuffer(), 'color.png')
    		msg.channel.send(color.substring(0, 20), solidColor)
      } catch(e) {
        msg.channel.send(`\`${color.substring(0, 20)}\` is invalid!`)
      }
    }
  }
}
