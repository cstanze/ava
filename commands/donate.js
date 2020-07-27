module.exports = {
  name: 'donate',
  description: 'Donate to the creators of Ava!',
  usage: '',
  aliases: ['donations'],
  cooldown: 5,
  type: 'Misc',
  execute(client, msg, args) {
    msg.channel.send(`Want to donate? Make sure you have a paypal account first!\nhttps://paypal.me/ConstanzeDev`)
  }
}
