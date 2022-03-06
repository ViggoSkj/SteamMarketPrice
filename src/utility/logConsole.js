const chalk = require("chalk")
const Time = require("./time")

function getTimeString(){ // gets time in a string of format: [hours:minutes:seconds:milliseconds]
    return chalk.inverse(Time.getTimeString())
}

function logTitle(message){ // extra formating for tittle
    console.log(message + " " + getTimeString())
}

function logInfo(message){ // extra formating for info
    console.log("   " + message)
}




module.exports.error = function(type, message){ // error
    logTitle(chalk.bold.red(`ERROR: ${type}`)) // title
    logInfo(chalk.redBright(message)) // info
    
}

module.exports.getRequestLog = function(message, ip){ // get 
    logTitle(chalk.blue(`get request at ${ip}`)) // title
    logInfo(chalk.blue(message)) // info 
    return Time.startTime()
}

module.exports.getResponseLog = function(message, ip, getRequestTimeId, withError=false){ // get response
    const time = Time.unixInMilisecondsToMiliAndSec(Time.endTime(getRequestTimeId))
    if (!withError) logTitle(chalk.cyan(`get request response at ${ip} and it took ${time.seconds}s and ${time.milliseconds}ms `)) // title
    else            logTitle(chalk.cyan(`get request response at ${ip} and it took ${time.seconds}s and ${time.milliseconds}ms `) + chalk.redBright("with error")) // title if the response contained an error
    logInfo(chalk.cyanBright(message)) // info
}

module.exports.warning = function(message){
    logTitle(chalk.yellow("Warning:"))
    logInfo(chalk.yellow(message))
}