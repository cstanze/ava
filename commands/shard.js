module.exports = {
  name: 'shard',
  description: 'Get information on the current shard that Ava is running on!',
  type: 'Utility',
  execute(client, msg, args) {
    msg.channel.send(`There are \`${client.guilds.cache.size}\` servers on the shard of id: \`${client.shard.ids[0]}\`. There are a total of \`${client.shard.count}\` shard(s)`)
  }
}
