module.exports = {
  name: 'stats',
  description: 'Get statistics for Ava',
  type: 'Misc',
  execute(client, msg, args) {
    const promises = [
      client.shard.fetchClientValues('guilds.cache.size'),
      client.shard.broadcastEval('this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'),
    ];

    Promise.all(promises)
      .then(results => {
        const totalGuilds = results[0].reduce((prev, guildCount) => prev + guildCount, 0);
        const totalMembers = results[1].reduce((prev, memberCount) => prev + memberCount, 0);
        return msg.channel.send(`Working on ${totalGuilds} total guilds!\n${totalMembers} Current people using Ava!`);
      })
      .catch(console.error);
  }
}
