const Discord = require('discord.js')
const { Node, getTimestamp, getNode, getStep } = require('../util/snowflake')

module.exports = {
  name: 'snowflake',
  description: 'Generate a snowflake from the Ava epoch (1.1.2017, dd.mm.yyyy)',
  type: 'Utility',
  args: true,
  usage: '[worker id (0-4096)] [process id (0-shard_count)]',
  example: '47 2',
  async execute(client, msg, [wid, pid]) {
    wid = wid || 0
    pid = pid || 0
    const shardCount = (await client.shard.broadcastEval('this.shard.ids[0]')).reduce((acc, id) => acc < id ? id : acc, 0)

  }
}
