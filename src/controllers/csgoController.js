const csgoDataCollection = require("./../services/csgoDataCollection")
const logConsole = require("./../utility/logConsole")


// gets skin data from weapon, skin name, and wear (csgo)
module.exports.getSkinData = async function(req, res) {
    const data = {
        weapon: req.params.weapon,
        skinName: req.params.skinName,
        wear: req.params.wear,
    }

    logConsole.getRequestLog(`getSkinData (csgo) weapon: ${data.weapon}, skin name: ${data.skinName}, wear: ${data.wear}`) // get logging

    var final = null // what will be send to the user
    csgoDataCollection.getSkinData(data)
    .then(function (result) { // successfully got the data
        final = result
        logConsole.getResponseLog(`responded to: getSkinData (csgo) weapon: ${data.weapon}, skin name: ${data.skinName}, wear: ${data.wear}`) // get response logging
        
    }).catch(error => { // error somewere in proccess
        final = error
        logConsole.getResponseLog(`responded to: getSkinData (csgo) weapon: ${data.weapon}, skin name: ${data.skinName}, wear: ${data.wear}`, ip="0",withError=true) // get response with error loggin
        res.statusCode = 400
    }).finally(function (){
        res.send(final) // returns to user
    })
}