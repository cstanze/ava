class Database {
  constructor(client) {
    let self = this;
    self.client = client;
  }

  selectFrom(table, optionalQuery = '') {
    let res
    self.client.query(`SELECT * FROM ${table} ${optionalQuery}`, (err, rxs) => {
      if(err) console.log(err)
      res = rxs
      client.end()
    })
    return res
  }

  insertInto(table, keys, values) {
    let res
    self.client.query(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')})`)
  }
}

exports.Database = Database
