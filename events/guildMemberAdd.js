// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  const settings = client.getSettings(member.guild)

  if(settings.welcomeEnabled != 'true') return

  const welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.user).replace('{{member_count}}', member.guild.members.cache.size+1)

  member.guild.channels.cache.find(c => c.name.toLowerCase() == settings.welcomeChannel.toLowerCase().replace(/\s+/g, '-')).send(welcomeMessage).catch(console.error)
}
