const Docs = require('../utils/docs.js')
/* addroleDocs, banDocs, kickDocs, removeroleDocs */

class ModDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      Moderation command like \`ban\` and \`kick\`.\n
      Use with caution.
    `
  }
  listing() {
    return ['addrole', 'ban', 'kick', 'removerole', 'purge']
  }
}

module.exports = ModDocs
