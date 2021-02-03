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
avc | autoVoiceChannel
*/

class Database {
  constructor(client) {
    this.client = client;
  }

  selectFrom = async (table, optionalQuery = '') => new Promise((res, rej) => {
    this.client.query(`SELECT * FROM ${table} ${optionalQuery};`, (err, rev) => {
      if(err) return rej(err)
      res(rev)
    })
  })

  deleteFrom = async (table, conditions) => new Promise((res, rej) => {
    this.client.query(`DELETE FROM ${table} WHERE ${conditions.join('AND')}`, (err, rev) => {
      if(err) return rej(err)
      res(`DELETE 1`)
    })
  })

  insertInto = async (table, keys, values) => new Promise((res, rej) => {
    // const valueBak = values
    // values = []
    // for(const value of valueBak) {
      // typeof value == 'string' ? values.push(`'${value}'`) : values.push(value)
    // }
    this.client.query(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')});`, (err, rev) => {
      if(err) return rej(err)
      res(`INSERT 1`)
    })
  })

  query = async (query) => new Promise((res, rej) => {
    this.client.query(query, (err, rev) => {
      if(err) return rej(err)
      res(rev)
    })
  })

  upsertInto = async (table, keys, values, conflict, fallback) => new Promise((res, rej) => {
    this.client.query(`INSERT INTO ${table}(${keys.join(', ')}) VALUES (${values.join(', ')}) ON CONFLICT (${conflict.join(', ')}) DO UPDATE SET ${fallback.join(', ')};`, (err, rev) => {
      if(err) return rej(err)
      res(`UPSERT 1`)
    })
  })

  updateRow = async (table, updates, constraints) => new Promise((res, rej) => {
    this.client.query(`UPDATE ${table} SET ${updates.join(' AND ')} WHERE ${constraints.join(' AND ')};`, (err, rev) => {
      if(err) return rej(err)
      res(`UPDATE 1`)
    })
  })

}

exports.Database = Database
