const Discord = require('discord.js')
const Canvas = require('canvas')

module.exports = {
  name: 'gradient',
  description: 'Get a gradient color image from two colors.',
  usage: '<color one> <color two> <color stop (a number between 0 - 1)>',
  example: '#da5182 #ee3b25 0.75',
  args: true,
  type: 'Image',
  execute(client, msg, args) {
    const colorStop = Number(args[2]) || 0.7
    const colorSize = 128
    const canvas = Canvas.createCanvas(colorSize, colorSize)
    const ctx = canvas.getContext('2d')
    let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0)
    gradient.addColorStop(0, args[0])
    gradient.addColorStop(0.75, args[1])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.width)
    let gradientColor = new Discord.MessageAttachment(canvas.toBuffer(), 'gradient.png')
  	msg.channel.send(`${args[0]} -> ${args[1]} (${colorStop*100}% stop)`, gradientColor)
  }
}
