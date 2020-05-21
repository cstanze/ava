const db = require('quick.db')

module.exports = {
  name: 'balance',
  description: 'Get the number of Eris in your user profile.',
  usage: '@<mentioned user> (optional)',
  aliases: ['bal', 'money', 'monies', 'eris'],
  cooldown: 5,
  type: 'Currency',
  async execute(client, msg, args) {
    const user = msg.mentions.members.first() || msg.member;
    let money = await db.get(`user_${msg.guild.id}_${user.id}.bal`)
    if(money === null) money = 0;

    msg.channel.send(`${typeof user.nickname == "string" ? user.nickname : user.user.username}, you have \`${money} Eris\``)
  }
}
