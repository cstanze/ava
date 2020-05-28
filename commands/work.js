const db = require('quick.db')
const Discord = require('discord.js')
const ms = require('ms')
module.exports = {
  name: 'work',
  description: 'Work for Eris!',
  type: 'Currency',
  args: true,
  usage: '<type of work> (you can use "list" to get all types of work)',
  async execute(client, msg, args) {
    let timeout = ms('30m')
    args[0] = args[0].toLowerCase()
    let workTypes = ['architect', 'telemarketer', 'scientist', 'engineer', 'stripper', 'writer', 'director', 'developer']
    let lastWorkedAt = await db.get(`user_${msg.guild.id}_${msg.author.id}.work.lastWorked`)
    if(args[0] == "list") {
      let reply = `Types Of Work:\n\`\`\`\n`
      for(const typeOfWork of workTypes) {
        reply += `${typeOfWork.charAt(0).toUpperCase() + typeOfWork.slice(1)} ~ Salary: ${salaryForProfession(typeOfWork)} Eris per hour\n`
      }
      reply += '\`\`\`'
      return msg.channel.send(reply)
    }
    if(!workTypes.includes(args[0])) return msg.channel.send(`That's not a valid type of work. Please use: \`${msg.prefix}work list\` to list the professions of work.`)
    let placeOfWork = typeof lastWorkedAt.type != 'undefined' ? companyFromProfession(lastWorkedAt.type) : companyFromProfession(args[0])
    if(lastWorkedAt != null && timeout - (Date.now() - lastWorkedAt.time) > 0) {
      let time = ms(timeout - (Date.now() - lastWorkedAt.time))
      return msg.channel.send(`Your boss${placeOfWork == 'Messy Tech Inc.' ? ' \`Daydream\` ' : ' '}at \`${placeOfWork}\` decided you should relax before working again. You can come back to work in **${time}**`)
    }
    placeOfWork = companyFromProfession(args[0])
    let amount = 100
    if(args[0] == 'architect') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    if(args[0] == 'telemarketer') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    if(args[0] == 'scientist') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    if(args[0] == 'engineer') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    if(args[0] == 'stripper') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    if(args[0] == 'writer') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    if(args[0] == 'director') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    if(args[0] == 'developer') amount = Math.floor(Math.random() * salaryForProfession(args[0])) + 50
    let description = amount >= 100 ? `You worked for one hour and...\nLooks like your work payed off!\n${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username}, you earned a fair amount of Eris doing work!` : `You worked for one hour and...\nShoulda worked harder.\n${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username}, your boss at \`${placeOfWork}\` deemed your work ethic as sub-par. Should have tried harder!`
    let workEmbed = new Discord.MessageEmbed()
    .setAuthor(`${typeof msg.member.nickname == "string" ? msg.member.nickname : msg.member.user.username} - Work`, msg.member.user.avatarURL({ size: 512, dynamic: true }))
    .setDescription(description)
    .addField(`Work Reward`, `${amount} Eris`)
    .setColor('#8074d2')

    msg.channel.send(workEmbed)
    db.add(`user_${msg.guild.id}_${msg.author.id}.bal`, amount)
    // db.set(`user_${msg.guild.id}_${msg.author.id}.work.date`, Date.now())
    db.set(`user_${msg.guild.id}_${msg.author.id}.work.lastWorked`, { type: args[0], time: Date.now() })
  }
}

companyFromProfession = (work) => {
  if(work == 'architect') return 'United Architecture Ltd.'
  if(work == 'telemarketer') return 'AMS Telemarketing Inc.'
  if(work == 'scientist') return 'GFE Medical LLC.'
  if(work == 'engineer') return 'EngineerFlight Corp.'
  if(work == 'stripper') return 'The Temptation Club'
  if(work == 'writer') return 'BookWorms Co.'
  if(work == 'director') return 'Laughable Studios'
  if(work == 'developer') return 'Messy Tech Inc.'
}

salaryForProfession = (work) => {
  if(work == 'architect') return 256
  if(work == 'telemarketer') return 125
  if(work == 'scientist') return 154
  if(work == 'engineer') return 238
  if(work == 'stripper') return 115
  if(work == 'writer') return 168
  if(work == 'director') return 259
  if(work == 'developer') return 260
}
