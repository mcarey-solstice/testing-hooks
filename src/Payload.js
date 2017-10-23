/**
 *
 */

'use strict'

const env = require('./env')

const request = require('request')

const debug = require('debug')('protections:Payload')

/**
 *
 */
class Payload {

    static get URL() {
        return "/repos/:owner/:repo/branches/:branch/protection"
    }

    static get HEADERS() {
        return {
            // "Accept": "application/vnd.github." + env("URL_VERSION") + "+json",
            "User-Agent": env("USER_AGENT"),
            "If-None-Match": '"' + env("APIKEY") + '"',
            "Content-Type": "application/json"
        }
    }

    static get OPTIONS() {
        return [
            "required_status_checks",
            "enforce_admins",
            "required_pull_request_reviews",
            "restrictions"
        ]
    }

    constructor(branch, options) {
        options = options || {}

        this.branch = branch
        this.options = {}

        Payload.OPTIONS.forEach((key) => {
            this.options[key] = options[key]
        })
    }

    get body() {
        let options = {}

        Payload.OPTIONS.forEach((key) => {
            options[key] = this.options[key] || null
        })

        return options
    }

    get url() {
        return env("URL_BASE")
            + Payload.URL
                .replace(":owner", env("URL_OWNER"))
                .replace(":repo", env("URL_REPO"))
                .replace(":branch", this.branch)
    }

    send(next) {
        debug("Sending a request: %O", {
            method: 'PUT',
            uri: this.url,
            headers: Payload.HEADERS,
            json: this.body
        })

        request({
            method: 'PUT',
            uri: this.url,
            headers: this.headers,
            json: this.body
        }, function (err, res, body) {
            if (err) {
                console.error(err)
                return next(err)
            }

            debug("Response returned: %O", body)
            return next()
        })
    }

}

module.exports = Payload
