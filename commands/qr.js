const Discord = require('discord.js')
const { generateHexID } = require('../util/ClusterManager.js')
const qr = require('qrcode')
const Canvas = require('canvas')

module.exports = {
  name: 'qr',
  description: 'Create a QR Code from arguments.',
  type: 'Image',
  args: true,
  usage: '<qr data>',
  example: 'https://discord.com',
  async execute(client, msg, args) {
    msg.channel.send(`Generating...`).then(async m => {
      const canvas = Canvas.createCanvas(512, 512)
      const dataUri = await qr.toCanvas(canvas, args.join(' '))
      msg.channel.send(new Discord.MessageAttachment(canvas.toBuffer(), `qr_${generateHexID(Math.floor((Math.random() + 1) * 8))}.png`))
      m.delete()
    })
  }
}
