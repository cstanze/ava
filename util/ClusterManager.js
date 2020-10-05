// the meat, clean off the bone.
class ClusterManager {
  // the beginning of the end.
  constructor(worker) {
    this.worker = worker
    this.hexID  = generateHexID(worker.id)
  }

  // pls override kthnx
  begin() {}

  // Kill thy worker.
  kill() {
    this.worker.kill()
  }

  // Kill it, but I'm nice so lets bring it back...
  respawn() {
    this.worker.send({
      type: 'respawn',
      worker: this.worker
    })
  }

  // who are you?
  identify() {
    return `${this.worker.id}${arguments[0] ? ` - 0x${this.hexID}` : ``}`
  }
}

// i wasted my time
generateHexID = id => {
  return (Math.floor(((Math.random() * 16) * (Math.random() * 16) + 8 * id)) * id).toString(16).slice(0, 2).toUpperCase()
}

// :5head:
module.exports = {
  ClusterManager,
  generateHexID
}
