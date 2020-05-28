const Enmap = require('enmap')
const settings = new Enmap({
  name: 'settings',
  cloneLevel: 'deep',
  ensureProps: true
})
const defaultSettings = {
  "modLogChannel": "mod-log",
  "modRole": "Moderator",
  "adminRole": "Administrator",
  "systemNotice": "true",
  "welcomeChannel": 'welcome',
  "welcomeMessage": "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D",
  "welcomeEnabled": "false",
  'no-xp-channel': 'spam'
}

init = async () => {
  console.log("Setting up Ava config...")
  await settings.defer;
  if(!settings.has('default')) {
    await settings.set(`default`, defaultSettings)
  }
  await settings.close()
}

init()
