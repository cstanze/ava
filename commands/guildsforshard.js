module.exports = {
  name: 'guildsforshard',
  description: 'Get a list of guilds in a shard.',
  aliases: ['gfs'],
  permissionsLevel: 'True Owner',
  args: true,
  usage: '<shard id>',
  example: '0',
  async execute(client, msg, [shard]) {
    const guildCache = (await client.shard.broadcastEval(`this.shard.ids[0] == ${shard} ? this.guilds.cache : null`)).find(x => x != null)
    const longestGuildName = guildCache.reduce((acc, x) => x.name.length > acc.length ? x.name : acc, '').length
    const gLong = longestGuildName - 10 < 0 ? 0 : longestGuildName - 10
    const guildTableHeader = `Guild ID          |Guild Name${' '.repeat(gLong)}\n`
    const guildTableSep    = `------------------+----------${'-'.repeat(gLong)}\n`
    let guildTableBody = `${guildTableHeader}${guildTableSep}`
    guildCache.forEach(g => {
      guildTableBody += `${g.id}|`
      guildTableBody += `${g.name}\n`
    })
    msg.channel.send(client.code('', guildTableBody))
  }
}
