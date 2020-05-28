module.exports = (client, guild) => {
  if(!guild.available) return;
  client.logger.cmd(`[Guild Leave] ${guild.name} (${guild.id}) removed Ava.`)
  if(client.settings.has(guild.id)) {
    client.settings.delete(guild.id)
  }
}
