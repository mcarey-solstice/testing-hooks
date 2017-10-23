/**
 *
 */

'use strict'

const env = require('./src/env')

let app = require('./src/app')

const PORT = env('PORT', 8080)

app.listen(PORT)
console.log("Listening on port " + PORT)

module.exports = app
