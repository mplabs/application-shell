import config from './webpack.config'

config.entry = [`${__dirname}/src/index.js`]
config.plugins = []

module.exports = config