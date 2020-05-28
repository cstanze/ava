module.exports = {
  name: 'ping',
  description: 'Ping!',
  type: 'Utility',
  execute(client, msg, args) {
    let start = new Date().getTime()
    let elapsed
    let sendElp
    msg.channel.send('pong!\n'+`\`${client.ws.ping}ms\` heartbeat ping`).then(mxg => {
      sendElp = new Date().getTime() - start
      start = new Date().getTime()
      mxg.channel.send(`API ping time: \`${sendElp}ms\``).then(myg => {
        myg.edit(`Editing...`).then(mzg => {
          elapsed = new Date().getTime() - start
          mzg.edit(`API ping time: \`${sendElp}ms\`\nMessage edit Ping: \`${elapsed}ms\``)
        })
      })
    })
  }
}
