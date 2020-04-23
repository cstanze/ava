String.prototype.addSlashes = () => {
   return this.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

handlePrefixAlter = (msg, guildId)  => {
  msg.channel.send(msg.content.addSlashes())
}

handlePrefixFinish = (msg, guildId)  => {
  msg.channel.send(msg.content.addSlashes())
}
