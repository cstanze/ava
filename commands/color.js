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
      const canvas = Canvas.createCanvas(colorSize, colorSize)
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.width)
      let solidColor = new Discord.MessageAttachment(canvas.toBuffer(), 'color.png')
  		msg.channel.send(color, solidColor)
    }
  }
}
