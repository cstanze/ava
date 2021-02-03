const chalk = require('chalk')

module.exports = {
  name: 'reload',
  description: 'Reloads the current shard or all shards.',
  type: 'Private',
  async execute(client, msg, [shardId, ..._values]) {
    
    if(msg.author.permLevel < 10) {
      msg.channel.send(`Sorry, you may not request a shard reload. Your permissions level must be 11 (Lead Developer)`)
      await client.logToStream(`reload`, {
        shard: `${client.shard.ids[0]} (RequestedID: \`${shardId}\`)`,
        userTag: msg.author.tag,
        userId: msg.author.id,
        complete: false
      })
      return
    }
    if(shardId != 'all') {
      console.log(chalk.blue(`[Ava]`), chalk.green(`[Shard ${client.shard.ids[0]}]`), 
        `Requested exit on current shard by user: ${msg.author.tag} (${msg.author.id})`)
      await client.logToStream(`reload`, {
        shard: `${client.shard.ids[0]} (RequestedID: \`${client.shard.ids[0]}\`)`,
        userTag: msg.author.tag,
        userId: msg.author.id,
        complete: true
      })
      process.exit(0)
    } else {
      await client.logToStream(`reload`, {
        shard: `${client.shard.ids[0]} (RequestedID: \`all\`)`,
        userTag: msg.author.tag,
        userId: msg.author.id,
        complete: true
      })
      await client
        .shard
        .broadcastEval(`this.requestedReload(this.shard.ids[0], "${msg.author.tag}", "${msg.author.id}")`)
      msg.channel.send(`Reload request on all shards`)
    }
  }
}
