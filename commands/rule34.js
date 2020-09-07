const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
  name: 'rule34',
  description: 'Search for rule34 images with tags.',
  type: 'NSFW',
  nsfw: true,
  usage: '<rule34 tags (separated by commas)>',
  example: 'dark skin, female',
  aliases: ['r34'],
  args: true,
  async execute(client, msg, args) {
    let argx = msg.content.slice(msg.prefix.length+'rule34 '.length)
    argx = argx.split(/,\s+/g)
    let argz = []
    for(const arg in argx) {
      argz.push(arg.replace(/\s+/g, '_'))
    }
    argz = argz.join('+')
    let p = await (await fetch(`https://r34-json-api.herokuapp.com/posts?tags=${argz}&limit=75`)).json()
    p = p[Math.floor(Math.random() * p.length)]
    if(p.type != 'image') return
    const embed = new Discord.MessageEmbed()
      .setTitle('Clickie')
      .setURL(p.creator_url)
      .setImage(p.file_url)
      .setFooter(
        `Requested by: ${msg.author.tag}\n Provided By: rule34.xxx`,
        msg.author.avatarURL({ format: 'png', dynamic: true }),
      )
      .setColor('#f15152')
      .setTimestamp(Date.parse(p.created_at))
    msg.channel.send(embed)
  }
}
