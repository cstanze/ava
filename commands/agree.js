module.exports = {
  name: 'agree',
  description: 'Do you agree?',
  type: 'Fun',
  args: true,
  usage: '<thing to agree too>',
  execute(client, msg, args) {
    const filter = (reaction, user) => {
      return reaction.emoji.name == '👍'
    };
    msg.channel.send(`👍 if you **agree that** *${args.join(' ')}*`).then(mxg => {
      mxg.react('👍')
      const collector = mxg.createReactionCollector(filter, { time: 30000 })
      collector.on('collect', (reaction, user) => {
        if(user.id == "702896046480818218") return
        msg.channel.send(`${user.username} **agrees**`)
      })
      collector.on('end', collected => {
        if(collected.size > 1) {
          msg.channel.send(`${collected.size} people **agree**`)
          return
        }
        msg.channel.send(`${collected.size} person **agrees**`)
      })
    })
  }
}
