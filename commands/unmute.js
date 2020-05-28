const Discord = require('discord.js')
const ms = require('ms')
const db = require('quick.db')
const chalk = require('chalk')
const fs = require('fs')
const { fetchMemberWithId } = require('../helpers/fetchMember.js')

module.exports = {
  name: 'unmute',
  description: 'Does exactly what you think it does. Mention a person to unmute. They get unmuted',
  args: true,
  usage: '@<user to unmute>',
  example: '@User',
  cooldown: 10,
  type: 'Moderation',
  permissionsLevel: 'Server Moderator',
  async execute(client, msg, args) {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(`Hmm... Looks like you don't have the right permissions to mute somebody.`)
    const target = msg.mentions.members.first() || fetchMemberWithId(msg.guild, args[0])
    if(!target) return msg.channel.send(`You didn't specify a person to unmute`)
    if(target.roles.highest.position >= msg.member.roles.highest.position) return msg.channel.send(`You can't unmute a member with a highest role position above or equal to your highest role position`)
    let mutedRole = msg.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted' || r.name.toLowerCase() == 'avamute')
    if(!mutedRole) return msg.channel.send(`This server doesn't have a muted role; therefore, there is no one muted.`)
    await target.roles.remove(mutedRole).catch(err => {
      console.error(err)
      return msg.channel.send("Hmm... I couldn't seem to unmute this person.")
    })
    msg.channel.send(`Successfully unmuted **${typeof target.nickname == "string" ? escapeMarkdown(target.nickname) : escapeMarkdown(target.user.username)}**`)
  }
}
