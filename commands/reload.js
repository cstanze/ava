module.exports = {
  name: 'reload',
  description: 'Reloads the AvaSharder process. (temporarily disables all instances of Ava)',
  useMySQL: true,
  type: 'Private',
  permissionsLevel: 'Bot Owner',
  async execute(client, msg, args, con) {
    process.exit(0)
  }
}
