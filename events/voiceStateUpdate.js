module.exports = async (client, ovs, nvs) => {
  try {
    const settings = await client.getSettings(ovs.guild)
    if(nvs.channelID) {
      let category = await nvs.guild.channels.cache.get(nvs.channelID)
      if(category.name != settings.avc) return
      category = category.parent
      if(!category) return
      const member = await nvs.guild.members.fetch(nvs.id)
      if(!client.vcl[`${member.id}`]) {
        nvs.guild.channels.create(`${ovs.member.user.username}'s channel`, {
          type: 'voice',
          parent: category
        }).then(c => {
          client.vcl[`${member.id}`] = c.id
          nvs.setChannel(c, 'Created an auto vc. - Love, Ava')
        })
      }
    } else {
      const member = await nvs.guild.members.fetch(nvs.id)
      let channel = await ovs.guild.channels.cache.get(ovs.channelID)
      if(client.vcl[`${member.id}`] == channel.id) {
        if(!channel.members.size) {
          channel.delete(`Hope you enjoyed auto vc. - Love, Ava`)
        }
        delete client.vcl[`${member.id}`]
      }
    }
  } catch(e) {
    return console.log(e)
  }
}
