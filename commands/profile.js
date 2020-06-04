const Discord = require('discord.js')
const db = require('quick.db')
const Canvas = require('canvas')

module.exports = {
  name: 'profile',
  description: 'Get your guild specific profile!',
  type: 'User',
  async execute(client, msg, args) {
    const target = msg.mentions.members.first() || msg.member
    if(target.id == client.id || target.user.bot) return msg.channel.send(`This is user is a bot!`)
    msg.channel.send(`Getting and organizing profile information for: \`${target.nickname || target.user.username}\`...`).then(async mxg => {
      try {
        const ship = "No Ship Found"
        const xp = await db.get(`user_${msg.guild.id}_${target.user.id}.xp`)
        const level = Math.floor(xp / 200)
        const eris = await db.get(`user_${msg.guild.id}_${target.user.id}.bal`).toFixed(0)
        const bio = await db.get(`user_${msg.guild.id}_${target.user.id}.bio`) || `No Bio For ${target.displayName}`
        await Canvas.registerFont('assets/fonts/Montserrat.ttf', { family: 'Montserrat' })
        await Canvas.registerFont('assets/fonts/MontserratBold.ttf', { family: 'MontserratBold' })
        await Canvas.registerFont('assets/fonts/discord.ttf', { family: 'Discord' })
        const canvas = Canvas.createCanvas(615, 648)
        const ctx = canvas.getContext('2d')
        const topSector = await Canvas.loadImage('./images/discord-items.jpg')
        const itemCount = '0'
        const itemTotal = '0'
        // Main image sector
        ctx.drawImage(topSector, 0, 0, canvas.width, canvas.height-432/1.15)
        // Bottom Rect sector
        ctx.strokeStyle = '#ffffff'
        ctx.fillStyle = '#8074d2'
        ctx.fillRect(0, canvas.height-432/1.2, canvas.width, canvas.height)
        // Middle Sector
        ctx.fillStyle = '#4b4b4b'
        ctx.fillRect(0, canvas.height-432/1.15, canvas.width, 20)
        // Rect Around
        ctx.strokeStyle = '#74037b'
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
        // Fill Style & Font for Text Application
        ctx.fillStyle = '#ffffff'
        ctx.font = applyBoldText(canvas, `${target.displayName}`, 60)
        const nameWidth = ctx.measureText(`${target.displayName}`).width
        ctx.fillText(`${target.displayName}`, canvas.width / 2 - nameWidth / 2, canvas.height / 7)
        // Level Drawing
        ctx.font = applyBoldText(canvas, 'Level', 50)
        const levelWidth = ctx.measureText(`Level`).width
        ctx.fillText('Level', canvas.width / 4.55 - levelWidth, canvas.height / 1.8)
        // XP Left
        const xpLeft = ((level + 1) * 200) - xp
        ctx.font = applyMedText(canvas, `Level ${level}\nXP Until Level ${level+1}: ${xpLeft}`, 80)
        const xpWidth = ctx.measureText(`Level ${level}\nXP Until Level ${level+1}: ${xpLeft}`).width
        ctx.fillText(`Level ${level}\nXP Until Level ${level+1}: ${xpLeft}`, canvas.width / 4.55 - levelWidth, canvas.height / 1.6)
        // Eris Section
        ctx.font = applyBoldText(canvas, `Eris`, 50)
        const erisWidth = ctx.measureText(`Eris`).width
        ctx.fillText(`Eris`, canvas.width / 1.4 - erisWidth, canvas.height / 1.8)
        ctx.font = applyMedText(canvas, `Balance For\n${msg.guild.name}:\n${client.numbersWithCommas(eris)} Eris`, 40)
        ctx.fillText(`Balance For\n${msg.guild.name}:\n${client.numbersWithCommas(eris)} Eris`, canvas.width / 1.4 - erisWidth, canvas.height / 1.6)
        // Inventory Section
        ctx.font = applyBoldText(canvas, `Inventory`, 50)
        const inventoryWidth = ctx.measureText(`Inventory`).width
        ctx.fillText(`Inventory`, canvas.width / 2.75 - inventoryWidth, canvas.height / 1.3)
        // Inventory Data
        ctx.font = applyMedText(canvas, `${itemCount} items worth ${itemTotal} Eris.`, 80)
        ctx.fillText(`${itemCount} items worth ${itemTotal} Eris.`, canvas.width / 2.75 - inventoryWidth, canvas.height / 1.2)
        // Shipping
        ctx.font = applyLargeText(canvas, `SHIP NAME: ${cutShip(ship)}`)
        ctx.fillText(`SHIP NAME: ${cutShip(ship)}`, canvas.width / 2.75 - inventoryWidth, canvas.height / 1.05)
        // IMPORTANT: Avatar Clipping Should Be At The End...
        // Avatar Clipping
        ctx.beginPath()
        ctx.arc(canvas.width/2, canvas.height-432/1.15-55.5, 93.75, 0, Math.PI * 2, true)
        const arcGradient = ctx.createLinearGradient(canvas.width/2-93.75, canvas.height-432/1.15-93.75, canvas.width/2+93.75, canvas.height-432/1.15+93.75)
        arcGradient.addColorStop(0, '#ffcfdf')
        arcGradient.addColorStop(0.6, '#bof3f1')
        ctx.strokeStyle = arcGradient // '#6b6b6b' // '#ffffff'
        ctx.lineWidth = 10.5
        ctx.stroke()
        ctx.closePath()
        ctx.clip()
        // Avatar Drawing
        const avatar = await Canvas.loadImage(target.user.displayAvatarURL({ format: 'png' }))
        ctx.drawImage(avatar, canvas.width/2-93.75, canvas.height-432/1.15-150, 187.5, 187.5)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png')
        msg.channel.send(attachment)
        mxg.delete()
      } catch(e) {
        console.error(e)
      }
    })
  }
}

const applyText = (canvas, text, startingSize = 70) => {
  const ctx = canvas.getContext('2d')
  let fontSize = startingSize
  do {
    ctx.font = `${fontSize -= 10}px "Montserrat"`
  } while (ctx.measureText(text).width > canvas.width - 300)
  return ctx.font
}

const applyMedText = (canvas, text, startingSize = 70) => {
  const ctx = canvas.getContext('2d')
  let fontSize = startingSize
  do {
    ctx.font = `${fontSize -= 10}px "Discord"`
  } while (ctx.measureText(text).width > canvas.width - 310)
  return ctx.font
}

const applyMedLargeText = (canvas, text, startingSize = 70) => {
  const ctx = canvas.getContext('2d')
  let fontSize = startingSize
  do {
    ctx.font = `${fontSize -= 10}px "Discord"`
  } while (ctx.measureText(text).width > canvas.width - 290)
  return ctx.font
}

const applyLargeText = (canvas, text, startingSize = 70) => {
  const ctx = canvas.getContext('2d')
  let fontSize = startingSize
  do {
    ctx.font = `${fontSize -= 10}px "Discord"`
  } while (ctx.measureText(text).width > canvas.width-135)
  return ctx.font
}

const applyBoldText = (canvas, text, startingSize = 70) => {
  const ctx = canvas.getContext('2d')
  let fontSize = startingSize
  do {
    ctx.font = `${fontSize -= 10}px "MontserratBold"`
  } while (ctx.measureText(text).width > canvas.width - 300)
  return ctx.font
}

const cutBio = (bio) => {
  return bio.length > 24 ? bio : bio.substring(0, 24)+'...'
}

const cutShip = (bio, length = 30) => {
  return bio.length > length ? bio : bio.substring(0, 24)+'...'
}
