module.exports = {
  name: 'nick',
  description: 'Change the nickname for Ava',
  type: 'Misc',
  args: true,
  usage: '<nickname>',
  example: 'Ava!',
  async execute(client, msg, args) {
    if(!msg.member.hasPermission('MANAGE_NICKNAMES')) return msg.channel.send(`:warning: You don't have permission to change my nickname!`)
    msg.guild.me.setNickname(args[0])
  }
}
