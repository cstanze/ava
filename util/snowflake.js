// Mon Jan 1 2018 12:00:00 AM
const epoch = 1514782800000n

const nodeBits = 10n
const stepBits = 12n

const nodeMax = (-1n ^ -1n) << nodeBits
const nodeMask = nodeMax << stepBits
const stepMask = (-1n ^ -1n) << stepBits

const timeShift = nodeBits + stepBits
const nodeShift = stepBits

class Node {
  constructor(n) {
    n = parseInt(n)
    if (!n || isNaN(n)) {
      n = 0n
    } else {
      n = BigInt(n)
    }
    if(n < 0 || n > nodeMax) {
      throw 'Node must be between 0 and ' + nodeMax
    }
    this.time = 0n
    this.step = 0n
    this.n = n
  }

  next() {
    let now = BigInt(Date.now())

    if(this.time == now) {
      this.step = (this.step + 1n) & stepMask
      if(this.step == 0) {
        while(now <= this.time) {
          now = BigInt(Date.now())
        }
      }
    } else {
      this.step = 0n
    }

    this.time = now

    return (
      ((now - epoch) << timeShift) |
      (this.n << nodeShift) |
      (this.step)
    )
  }
}

getTimestamp = sf => {
  return parseInt(epoch + (BigInt(sf) >> timeShift))
}

getNode = sf => {
  return parseInt((BigInt(sf) & nodeMask) >> nodeShift)
}

getStep = sf => {
  return parseInt(BigInt(sf) & stepMask)
}

module.exports = {
  getTimestamp,
  getNode,
  getStep,
  Node
}
