const crypto = require('crypto')


var otp = new Array(30)
const serierNumber = 123646434


const genOTP = (sec) => {
    var hex = crypto.createHash('sha256').update(sec.toString()).digest('hex')
    return parseInt(hex, 16) / serierNumber % 10000000
}

const makeList30s = (curTime) => {
    var start = curTime - 30
    for (var i = 0; i < 30; ++i) {
        otp[i] = genOTP(start + i)
    }
}

const checkOTP = (clientOTP) => {
    makeList30s(Math.floor((new Date()).getTime() / 1000)) 
    for (var i = 0; i < 30; ++i) {
        if (otp[i] == clientOTP) {
            return true
        }
    }
    return false
}

const main = () => {
    var clientOTP = process.argv[2]
    console.log(checkOTP(clientOTP))    
}

main()