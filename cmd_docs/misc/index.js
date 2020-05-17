const Docs = require('../utils/docs.js')
/* botownersDocs, changelogDocs, nodelistDocs, pingDocs, serverinfoDocs, shardDocs, statsDocs, whatshardDocs */

class MiscDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      Miscellaneous commands that I didn't know how to categorize.\n
      You can message Mr.Robot#1970 for any categorization suggestions or maybe command suggestions.
    `
  }
  listing() {
    return ['botowners', 'changelog', 'nodelist', 'ping', 'serverinfo', 'shard (Server)', 'stats', 'whatshard (Client)']
  }
}

module.exports = MiscDocs
