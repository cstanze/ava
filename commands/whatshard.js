module.exports = {
  name: 'whatshard',
  description: 'Find out the shard of the current guild!',
  execute(client, msg, args) {
    let shard = msg.guild.shard
		msg.channel.send(`This guild is on shard \`${shard.id}\` with heartbeat ping of \`${shard.ping}ms\``)
  }
}
