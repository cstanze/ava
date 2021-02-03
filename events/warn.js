const chalk = require('chalk')

module.exports = async (client, warning) => {
  console.log(chalk.blue(`[Ava]`),chalk.yellow(`[Warn]`), warning)
}
