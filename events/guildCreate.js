module.exports = (client, guild) => {
  client.logger.cmd(`[Guild Join] ${guild.name} (${guild.id}) added Ava. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`)
  client.logToStream('join', {
    guildName: guild.name,
    guildId: guild.id,
    owner: `${guild.owner.user.tag} (${guild.owner.user.id})`
  })
}
