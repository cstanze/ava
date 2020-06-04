const Discord = require('discord.js')
const db = require('quick.db')
const { fetchUserWithId } = require('../helpers/fetchMember.js')

module.exports = {
  name: 'whitelist',
  description: 'Whitelist someone from using Ava via their user snowflake. (Use only when absolutely necessary)',
  type: 'Private',
  args: true,
  usage: '<user id to whitelist>',
  permissionsLevel: 'Secret Service',
  async execute(client, msg, args) {
    let blacklisted = await db.get(`blacklist`)
    let filteredBlacklist = blacklisted == null ? undefined : blacklisted.find(o => o.userId == args[0])
    if(typeof filteredBlacklist == 'undefined') return msg.channel.send(`This person is already whitelisted!`)
    let user = await fetchUserWithId(client, args[0])
    let userId = args[0]
    let newBlacklist = blacklisted.filter(o => o != filteredBlacklist)
    await db.set(`blacklist`, newBlacklist)
    return msg.channel.send(`Successfully whitelisted ${user.username}`)
  }
}
