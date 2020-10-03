module.exports = {
  name: 'failed',
  description: 'Gets a list of commands and events that failed to load!',
  type: 'Private',
  async execute(client, msg, args) {
    if(client.failedCommands.length) {
      const cLong = client.failedCommands.sort(([c,r], [c2,r2]) => c2.length - c.length)[0][0].length
      const rLong = client.failedCommands.sort(([c,r], [c2,r2]) => r2.length - r.length)[0][1].length
      const tableHeader = `Command${' '.repeat((cLong <= 5 ? 6 : cLong)-7)}|Reason${' '.repeat((rLong <= 5 ? 6 : rLong)-6)}\n`
      const tableHeaderSep = `-------${'-'.repeat((cLong <= 5 ? 6 : cLong)-7)}+------${'-'.repeat((rLong <= 5 ? 6 : rLong)-6)}\n`
      let tableBody = ``
      for(const [command, reason] of client.failedCommands) {
        tableBody += `${command}${' '.repeat((((cLong <= 5 ? 6 : cLong)-7)+7)-command.length)}|`
        tableBody += `${reason}${' '.repeat((((rLong <= 5 ? 6 : rLong)-6)+6)-reason.length)}\n`
      }
      msg.channel.send(client.code('', tableHeader+tableHeaderSep+tableBody))
    } else {
      msg.channel.send(`No Commands Failed! :tada:`)
    }

    if(client.failedEvents.length) {
      const ceLong = client.failedEvents.sort(([e,r], [e2,r2]) => e2.length - e.length)[0][0].length
      const reLong = client.failedEvents.sort(([e,r], [e2,r2]) => r2.length - r.length)[0][1].length
      const tableEHeader = `Event${' '.repeat((ceLong <= 5 ? 6 : ceLong)-5)}|Reason${' '.repeat((reLong <= 5 ? 6 : reLong)-6)}\n`
      const tableEHeaderSep = `-----${'-'.repeat((ceLong <= 5 ? 6 : ceLong)-5)}+------${'-'.repeat((reLong <= 5 ? 6 : reLong)-6)}\n`
      let tableEBody = ``
      for(const [ev, reason] of client.failedEvents) {
        tableEBody += `${ev}${' '.repeat((((ceLong <= 5 ? 6 : ceLong)-5)+5)-ev.length)}|`
        tableEBody += `${reason}${' '.repeat((((reLong <= 5 ? 6 : reLong)-6)+6)-reason.length)}\n`
      }
      msg.channel.send(client.code('', tableEHeader+tableEHeaderSep+tableEBody))
    } else {
      msg.channel.send(`No Events Failed! :tada:`)
    }
  }
}
