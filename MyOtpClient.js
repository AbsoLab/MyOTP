const crypto = require('crypto')

const genOTP = (sec, seriarNumber) => {
    var hex = crypto.createHash('sha256').update(sec.toString()).digest('hex')
    return parseInt(hex, 16) / seriarNumber % 10000000
}

const main = () => {
    if (process.argv.length != 3) {
        console.log("$MyOptClient [Serial]")
        return
    }
    var seriarNumber = process.argv[2]

    console.log(genOTP(Math.floor((new Date()).getTime() / 1000), seriarNumber))
}

main()