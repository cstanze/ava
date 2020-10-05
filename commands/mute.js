const Discord = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const chalk = require('chalk')
const fs = require('fs')
const { fetchMemberWithId } = require('../util/fetchMember.js')

module.exports = {
  name: 'mute',
  description: 'Does exactly what you think it does. Mention a person to mute. They get muted',
  args: true,
  usage: '@<user to mute> <minutes to mute> <reason (optional)>',
  example: '@User 5m He asked for it',
  cooldown: 10,
  type: 'Moderation',
  permissionsLevel: 'Server Moderator',
  async execute(client, msg, args) {
    // Deprecated for now...
    return msg.channel.send(`Please wait, this command is under construction!`)

    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send('This is awkward. Seems like you don\'t have the right permissions to mute somebody')
    let target = msg.mentions.members.first() || await fetchMemberWithId(msg.guild, args[0])
    if(!target) return msg.channel.send(`You didn't specify who to mute.\nType: ${msg.prefix}`)
    if(target.id == msg.author.id) return msg.channel.send(`Not to be rude but, unless you're a dunce, you can't mute yourself.`)
    if(target.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(`I can't mute this person: ${target.user.tag}`)
    if(target.roles.highest.position >= msg.member.roles.highest.position) return msg.channel.send(`You can't mute a member with a role equal to or higher than yours.`)
    if(!args[1]) return msg.channel.send(`How long are we going to mute this person?`)
    let timing = ms(args[1])
    args[2] = args.splice(2).join(' ')
    let reason = args[2] || "Muted By Ava. No Reason Provided"
    let mutedRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted' || r.name.toLowerCase() == 'avamute')
    if(!mutedRole) {
      try {
        mutedRole = await msg.guild.roles.create({
          data: {
            name: 'AvaMute',
            color: '#000000',
            permissions: []
          }
        })

        msg.guild.channels.cache.forEach(async (chan, id) => {
          await chan.overwritePermissions([{
            id: mutedRole.id,
            deny: ['SEND_MESSAGES', 'ADD_REACTIONS']
          }])
        })
      } catch (e) {
        console.error(e)
        return msg.channel.send("Something happened! I couldn't mute this person.")
      }
    }
    await target.roles.add(mutedRole).catch(err => {
      if(err.code = 50013) return msg.channel.send(`I didn't have correct permissions to mute the user. Check my permissions in the role settings`)
      return msg.channel.send(`Something happened! I could't mute this person: ${target.tag}`)
      console.error(chalk.red(`[Error][Caught]`), chalk.yellow(`[Undocumented Error]`), err)
    }).then(() => {
      msg.channel.send(`Successfully muted **${target.user.username}** for **${args[1]}**`)
    })
    setTimeout((t, r) => {
      t.roles.remove(r).catch(err => {
        if(err.code == 50013) return msg.channel.send(`I didn't have correct permissions to unmute the user. Check my permissions in the role settings`)
        return msg.channel.send(`Something happened! I could't unmute this person: ${target.tag}`)
        console.error(chalk.red(`[Error][Caught]`), chalk.yellow(`[Undocumented Error]`), err)
      })
    }, timing, target, mutedRole)
  }
}
