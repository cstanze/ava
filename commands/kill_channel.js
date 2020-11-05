module.exports = {
  name: "kill_channel",
  description: "Delete a channel",
  type: "Private",
  permissionsLevel: "Bot Owner",
  async execute(client, msg, args) {
    const channel = args[0]
    msg.guild.channels.cache.get(channel).delete()
    msg.channel.send("Done!")
  }
}
