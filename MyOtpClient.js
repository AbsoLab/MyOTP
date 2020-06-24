const crypto = require('crypto')
const serierNumber = 123646434

const genOTP = (sec) => {
    var hex = crypto.createHash('sha256').update(sec.toString()).digest('hex')
    return parseInt(hex, 16) / serierNumber % 10000000
}

const main = () => {
    console.log(genOTP(Math.floor((new Date()).getTime() / 1000)))
}

main()