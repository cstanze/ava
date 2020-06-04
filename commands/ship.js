const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const parseMs = require('parse-ms')
const { fetchUserWithId } = require('../helpers/fetchMember.js')

module.exports = {
  name: 'ship',
  description: 'Tryna get it on with someone? :smirk:',
  type: 'User',
  usage: '<@user to ship (optional)> or "sink" to sink your ship or "rename" to rename your ship!',
  example: '@User',
  async execute(client, msg, args) {
    const target = msg.mentions.members.first() || 'nomb'
    if(target != 'nomb') {
      if(await db.get(`user_${msg.guild.id}_${target.user.id}`) != null) return msg.channel.send(`:x: ${target.displayName} is already shipped with someone else!`)
      const shipname = `${firstHalf(msg.member.displayName)}${secondHalf(target.displayName)}`
      const shipRes = await client.awaitReply(msg, `<@!${target.user.id}>, Looks like ${msg.member.displayName} would like to get it on :smirk:\nType \`accept\` or \`reject\``, ms('2m'), target.user.id)
      if(shipRes == false || shipRes.toLowerCase() != 'accept') return msg.channel.send(`<@!${msg.author.id}>, Looks like ${target.displayName} doesn't want to get it on.\nBetter luck next time!`)
      await db.set(`user_${msg.guild.id}_${msg.author.id}.ship`, {
        so: `user_${msg.guild.id}_${target.user.id}`,
        start: Date.now(),
        nickname: shipname
      })
      await db.set(`user_${msg.guild.id}_${target.user.id}.ship`, {
        so: `user_${msg.guild.id}_${msg.author.id}`,
        start: Date.now(),
        nickname: shipname
      })
      return msg.channel.send(`:tada: Congrats! The USS ${shipname} :heart: has set sail! Use \`${msg.prefix}ship\` to view information on your ship! :tada:\nNot satisfied with your ship name? Try using \`${msg.prefix}ship rename <new ship name>\` to rename your ship!`)
    }
    let firstSO = await db.get(`user_${msg.guild.id}_${msg.author.id}.ship`) || 'nothing'
    if(firstSO == 'nothing') return msg.channel.send(`:warning: You're currently not shipped with anybody.`)
    let secondSO = await db.get(`${firstSO.so}.ship`)
    if(secondSO.so != `user_${msg.guild.id}_${msg.author.id}`) return msg.channel.send(`:warning: You're currently not shipped with anybody`)
    if(typeof args[0] != 'undefined') {
      if(args[0].toLowerCase() == 'rename') {
        if(typeof args[1] == 'undefined') return msg.channel.send(`:x: You don't have a new name for your ship!`)
        args.shift()
        args[1] = args.join(' ')
        if(args[1].length > 32) return msg.channel.send(`:warning: Your new ship name must be under 32 characters!`)
        await db.set(`${firstSO.so}.ship.nickname`, args[1])
        await db.set(`user_${msg.guild.id}_${msg.author.id}.ship.nickname`, args[1])
        return msg.channel.send(`:thumbsup: I've renamed your ship to ${args[1]}`)
      }
    }
    let time = parseMs(Date.now() - firstSO.start)
    let shipEmbed = new Discord.MessageEmbed()
    .setTitle(`The USS ${secondSO.nickname}`)
    .setDescription(`Here's some information on your ship...`)
    .addField(`Partner 1`, `<@!${secondSO.so.split('_')[2]}>`, true)
    .addField(`Partner 2`, `<@!${firstSO.so.split('_')[2]}>`, true)
    .addField(`Set Sail`, parseDate(time))
    .setColor('#8074d2')
    .setFooter(client.randomFooters[Math.floor(Math.random() * client.randomFooters.length)])
    .setTimestamp()
    msg.channel.send(shipEmbed)
  }
}

firstHalf = str => {
  if(str.length % 2 == 0) {
    return str.slice(0, str.length / 2)
  }
  return str.slice(0, (str.length - 1) / 2)
}

secondHalf = str => {
  if(str.length % 2 == 0) {
    return str.slice(str.length / 2, str.length)
  }
  return str.slice((str.length - 1) / 2, str.length)
}

parseDate = (time) => {
  if(time.days == 0 && time.hours > 0) return `${time.hours} hours and ${time.minutes} ago`
  if(time.hours == 0 && time.minutes > 0) return `${time.minutes} minutes ago`
  if(time.minutes == 0 && time.seconds > 0) return `${time.seconds} seconds ago`
  return `${time.days} days, ${time.hours} hours, and ${time.minutes} minutes ago`
}
