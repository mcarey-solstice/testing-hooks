/**
 *
 */

'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const Payload = require('./Payload')

const debug = require('debug')('protections:app')

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', function (req, res, next) {
    let payload = JSON.parse(req.body.payload)

    if (payload.ref_type === "repository") {
        return res.status(204).send()
    }

    debug("Ref: %s" + payload.ref)

    let obj = new Payload(payload.ref, {
        required_status_checks: {
            strict: true,
            contexts: []
        },
        required_pull_request_reviews: {
            require_code_owner_reviews: true,
            dismissal_restrictions: {
                users: [],
                teams: []
            }
        },
        enforce_admins: false,
        restrictions: {
            users: [],
            teams: []
        }
    })

    obj.send((err) => {
        if (err) {
            return next(err)
        }

        return res.status(200).send()
    })
})

module.exports = app
