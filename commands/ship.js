const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('ms')
const parseMs = require('parse-ms')
const moment = require('moment')
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
      if(target.id == msg.member.id) return msg.channel.send(`:x: As much as you may love yourself, you can't pilot a ship alone.`)
      if(typeof await db.get(`user_${msg.guild.id}_${msg.author.id}.ship`).so != 'undefined') return msg.channel.send(`:x: You are already shipped with someone else!`)
      if(typeof await db.get(`user_${msg.guild.id}_${target.user.id}.ship`).so != 'undefined') return msg.channel.send(`:x: ${target.displayName} is already shipped with someone else!`)
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
      return msg.channel.send(`:tada: Congrats! The USS ${shipname} has set sail! :tada: Use \`${msg.prefix}ship\` to view information on your ship!\nNot satisfied with your ship name? Try using \`${msg.prefix}ship rename <new ship name>\` to rename your ship!`)
    }
    let firstSO = await db.get(`user_${msg.guild.id}_${msg.author.id}.ship`)
    if(firstSO == null || typeof firstSO.so == 'undefined') return msg.channel.send(`:warning: You're currently not shipped with anybody.`)
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
      } else if(args[0].toLowerCase() == 'sink') {
        await db.set(`${firstSO.so}.ship`, {})
        await db.set(`user_${msg.guild.id}_${msg.author.id}.ship`, {})
        return msg.channel.send(`:broken_heart: The USS ${secondSO.nickname} has sunk.`)
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
  let weeks = time.days < 7 ? 0 : Math.floor(time.days / 7)
  let months = time.days < 30 ? 0 : Math.floor(time.days / 30)
  let years = time.days < 365 ? 0 : Math.floor(time.days / 365)
  if(years > 0) {
    time.days = time.days - (years * 365)
    weeks = weeks - (years * 52)
    months = months - (years * 12)
  }
  if(months > 0) {
    time.days = time.days - (months * 30)
    weeks = weeks - (months * 4)
  }
  if(weeks > 0) time.days = time.days - (weeks * 7)
  if(years == 0 && months > 0) return `${months} months, ${weeks} weeks, ${time.days} days, ${time.hours} hours, and ${time.minutes} minutes ago`
  if(months == 0 && weeks > 0) return `${weeks} weeks, ${time.days} days, ${time.hours} hours, and ${time.minutes} minutes ago`
  if(weeks == 0 && time.days > 0) return `${time.days} days, ${time.hours} hours, and ${time.minutes} minutes ago`
  if(time.days == 0 && time.hours > 0) return `${time.hours} hours and ${time.minutes} minutes ago`
  if(time.hours == 0 && time.minutes == 1) return `${time.minutes} minute ago`
  if(time.hours == 0 && time.minutes > 0) return `${time.minutes} minutes ago`
  if(time.minutes == 0 && time.seconds > 0) return `${time.seconds} seconds ago`
  return `${years} years, ${months} months ${weeks} weeks, ${time.days} days, ${time.hours} hours, and ${time.minutes} minutes ago`
}
