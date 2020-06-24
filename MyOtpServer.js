const crypto = require('crypto')

var otp = new Array(30)

const genOTP = (sec, seriarNumber) => {
    var hex = crypto.createHash('sha256').update(sec.toString()).digest('hex')
    return parseInt(hex, 16) / seriarNumber % 10000000
}

const makeList30s = (curTime, seriarNumber) => {
    var start = curTime - 30
    for (var i = 0; i < 30; ++i) {
        otp[i] = genOTP(start + i, seriarNumber)
    }
}

const checkOTP = (clientOTP, seriarNumber) => {
    makeList30s(Math.floor((new Date()).getTime() / 1000), seriarNumber) 
    for (var i = 0; i < 30; ++i) {
        if (otp[i] == clientOTP) {
            return true
        }
    }
    return false
}

const main = () => {
    if (process.argv.length != 4) {
        console.log("$MyOptServer [OTP] [Serial]")
        return
    }
    var clientOTP = process.argv[2]
    var seriarNumber = process.argv[3]
    console.log(checkOTP(clientOTP, seriarNumber))    
}

main()