const {v4: uuidv4} = require("uuid")

timers = {
    //ex
    // 11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000(id) : 32746238(start time)
}

unixInMiliseconds = function(){
    const d = new Date()
    return d.getTime()
}

module.exports.getTimeString = function() { // gets time in a string of format: [hours:minutes:seconds:milliseconds]
    const d = new Date()
    return `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}]`
}

module.exports.unixInMilisecondsToMiliAndSec= function(time){
    return {
        milliseconds: (time % 1000),
        seconds: (time - (time%1000))/1000
    }
}

module.exports.startTime = function(){
    const newId = uuidv4()
    timers[newId] = unixInMiliseconds()
    return newId
}

module.exports.endTime = function(id){
    const time = timers[id]
    delete timers[id]
    return unixInMiliseconds() - time
}