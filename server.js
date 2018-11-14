require('dotenv').config()
const { PORT = 80, MODE = 'development' } = process.env

const express = require('express')

const app = express()

if (MODE === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.config')

  const compiler = webpack(config)
  
  app.use(webpackDevMiddleware(compiler, { publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static('dist'))
app.use(express.static('public'))

app.listen(PORT, () => console.log(`Server is listening on :${PORT}...`))
