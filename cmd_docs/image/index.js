const Docs = require('../utils/docs.js')
/* awwDocs, dogDocs, kittenDocs */

class ImageDocs extends Docs {
  constructor(type) {
    super(type)
  }
  description() {
    return `
      Image commands for Ava. Nothing special I guess.
    `
  }
  listing() {
    return ['aww', 'dog', 'kitten']
  }
}
