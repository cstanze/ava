module.exports = {
  name: 'blacklist',
  description: 'Toggle blacklist status for an Ava user.',
  aliases: ['whitelist', 'block'],
  usage: '[user] [reason]',
  type: 'Private',
  permissionsLevel: 'Secret Service',
  async execute(client, msg, args) {
    const user = msg.mentions.users.first() || (args[0] || '')
    const userid = String(Object.prototype.hasOwnProperty.call(user, 'id') ? user.id : user).replace(/\D/gi, '')
    const hasUserID = userid.length && BigInt(userid).toString(2).length > 57

    if(hasUserID
      && !(await client.database.selectFrom(`blacklist`, 
          `where affected = ${userid}`)).rows[0])
    {
      const reason = args[1] || `No Reason Provided`
      try {
        await client.users.fetch(userid)
      } catch(e) {
        return msg.channel.send(`Couldn't find a user with that id. Is that a valid user id/mention?`)
      }
      await client.database.insertInto('blacklist', ['id', 'reason', 'affected'], [`${msg.author.id}`, `'${reason.trim()}'`, `${userid}`])
      msg.channel.send(`Blacklisted user with id: ${userid}`)
    } else if (hasUserID
      && (await client.database.selectFrom(`blacklist`,
         `where affected = ${userid}`)).rows[0])
    {
      await client.database.deleteFrom('blacklist', [`affected = ${userid}`])
      msg.channel.send(`Removed userid \`${userid}\` from the blacklist`)
    } else {
      let blacklists = (await client.database.selectFrom('blacklist')).rows

      if(!blacklists.length)
        blacklists.push({ id: `${'0'.repeat(18)}`, affected: `${'0'.repeat(18)}`, reason: `No Blacklisted Users` })

      const bll = blacklists.reduce((a, v) => {
        return {
          id: v.id.length > a.id ? v.id.length : a.id,
          reason: v.reason.length > a.reason ? v.reason.length : a.reason,
          affected: v.affected.length > a.affected ? v.affected.length : a.affected
        }
      }, { id: 0, reason: 0, affected: 0 })

      const reasonL = 6 - bll.reason > 0 
        ? 0 
        : bll.reason

      const tableHeader = `Blacklister       |UserID            |Reason${' '.repeat(reasonL)}`
      const tableHeadBd = `------------------+------------------+------${'-'.repeat(reasonL)}`
      let tableBody = `${tableHeader}\n${tableHeadBd}\n`
      for(const bl of blacklists) {
        console.log(bl)
        tableBody += `${bl.id}|`
        tableBody += `${bl.affected}|`
        tableBody += `${bl.reason}${' '.repeat(reasonL - bl.reason.length)}\n`
      }

      msg.channel.send(client.code('', tableBody))
    }

  }
}
