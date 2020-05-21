const Docs = require('../utils/docs.js')
/* evalDocs, reloadDocs, restartDocs, toggleownerDocs */

class PrivateDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      If you're reading this, you're looking for private bot maintainer commands.\n
      You're going to be able to see them but not use them. Ask Mr.Robot#1970 for more information.
    `
  }
  listing() {
    return ['eval', 'reload', 'toggleowner', 'reload_command']
  }
}

module.exports = PrivateDocs
