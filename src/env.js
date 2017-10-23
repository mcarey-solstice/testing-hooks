/**
 *
 */

'use strict'

require('dotenv-safe').load({allowEmptyValues: true})

function getenv(key) {
    switch (process.env[key]) {
        case 'true':
        case 'yes':
            return true
        case 'false':
        case 'no':
            return false
        case 'null':
            return null
        case '':
            return undefined
        default:
            return process.env[key]
    }
}

function env(key, value) {
    let _value = getenv(key)
    return _value == undefined ? value : _value
}

module.exports = env
