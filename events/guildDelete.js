module.exports = (client, guild) => {
  if(!guild.available) return;
  client.logger.cmd(`[Guild Leave] ${guild.name} (${guild.id}) removed Ava.`)
  client.logToStream('leave', {
    guildName: guild.name,
    guildId: guild.id
  })
}
