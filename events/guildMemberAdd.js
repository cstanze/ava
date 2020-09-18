// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  if(member.guild.id == '264445053596991498') return
  if(member.guild.id == `110373943822540800`) return
  const settings = client.getSettings(member.guild)

  if(settings.we != 'true') return

  const welcomeMessage = settings.wm.replace('{{user}}', member.user).replace('{{member_count}}', member.guild.members.cache.size+1)
  let chan = member.guild.channels.cache.find(c => c.name.toLowerCase() == settings.wc.toLowerCase().replace(/\s+/g, '-'))
  if(typeof chan == 'undefined') return
  chan.send(welcomeMessage).catch(console.error)
}
