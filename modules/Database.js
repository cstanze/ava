/*
key | external
-----------------
mdl | modLogChanel
mr  | modRole
ar  | adminRole
sn  | systemNotice
wc  | welcomeChannel
wm  | welcomeMessage
we  | welcomeEnabled
nxp | noXPChannel
sc  | starboardChannel
ssc | sinboardChannel
*/

class Database {
  constructor(client) {
    this.client = client;
  }

  selectFrom = async (table, optionalQuery = '', callback) => new Promise((res, rej) => {
    this.client.query(`SELECT * FROM ${table} ${optionalQuery};`, (err, rev) => {
      if(err) return rej(err)
      res(rev)
    })
  })

  insertInto = async (table, keys, values) => new Promise((res, rej) => {
    const valueBak = values
    values = []
    for(const value of valueBak) {
      typeof value == 'string' ? values.push(`'${value}'`) : values.push(value)
    }
    this.client.query(`INSERT INTO ${table}(${keys.join(', ')}) VALUES (${values.join(', ')});`)
    this.client.query(`SELECT * FROM ${table}`, (err, rev) => {
      if(err) return rej(err)
      res(rev)
    })
  })

  query = async (query, callback) => new Promise((res, rej) => {
    this.client.query(query, (err, rev) => {
      if(err) return rej(err)
      res(rev)
    })
  })

  upsertInto = async (table, keys, values, conflict, fallback) => new Promise((res, rej) => {
    const valueBak = values
    values = []
    for(const value of valueBak) {
      typeof value == 'string' ? values.push(`'${value}'`) : values.push(value)
    }
    this.client.query(`INSERT INTO ${table}(${keys.join(', ')}) VALUES (${values.join(', ')}) ON CONFLICT (${conflict.join(', ')}) DO UPDATE SET ${fallback.join(', ')};`)
    this.client.query(`SELECT * FROM ${table}`, (err, rev) => {
      if(err) return rej(err)
      res(rev)
    })
  })

  updateRow = async (table, updates, constraints) => new Promise((res, rej) => {
    this.client.query(`UPDATE ${table} SET ${updates.join(', ')} WHERE ${constraints.join(', ')}`)
    this.client.query(`SELECT * FROM ${table}`, (err, rev) => {
      if(err) return rej(err)
      res(rev)
    })
  })

}

exports.Database = Database
