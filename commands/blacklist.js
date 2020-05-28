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
    let filteredBlacklist = blacklisted.filter(o => o.userId == args[0])
    if(typeof filteredBlacklist[0] != 'undefined') return msg.channel.send(`This person is already blacklisted!`)
    let user = await fetchUserWithId(client, args[0])
    args[1] = args.join(' ').shift()
    await db.push(`blacklist`, { username: user.username, userId: args[0], reason: args[1] || 'No Reason Provided' })
  }
}
