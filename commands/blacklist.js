const Discord = require('discord.js')
const db = require('quick.db')
const { fetchUserWithId } = require('../helpers/fetchMember.js')

module.exports = {
  name: 'blacklist',
  description: 'Blacklist someone from using Ava via their user snowflake. (Use only when absolutely necessary)',
  type: 'Private',
  args: true,
  usage: '<user id to blacklist> <reason (optional)>',
  permissionsLevel: 'Secret Service',
  async execute(client, msg, args) {
    let blacklisted = await db.get(`blacklist`)
    let filteredBlacklist = blacklisted == null ? undefined : blacklisted.find(o => o.userId == args[0])
    if(typeof filteredBlacklist != 'undefined') return msg.channel.send(`This person is already blacklisted!`)
    let user = await fetchUserWithId(client, args[0])
    let userId = args[0]
    args.shift()
    args[1] = args.join(' ')
    await db.push(`blacklist`, { username: user.username, userId, reason: args[1] || 'No Reason Provided' })
    return msg.channel.send(`Successfully blacklisted ${user.username}`)
  }
}
