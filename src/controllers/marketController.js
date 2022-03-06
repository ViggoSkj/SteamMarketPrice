const steamMarketDataCollection = require("./../services/steamMarketDataCollection")
const logConsole = require("./../utility/logConsole")
const Error = require("./../utility/error")

module.exports.getItemIdByNameAndGame = async function(req, res){
    var getLog = `getItemIdByNameAndGame request with game: ${req.params.game}, itemName: ${req.params.itemName}`
    const timerId = logConsole.getRequestLog(getLog)

    var final = null
    steamMarketDataCollection.getItemId(req.params.itemName, req.params.game).then(result => {
        steamMarketDataCollection.getItemData(result).then(result => {
            res.send(result)
            logConsole.getResponseLog(`responded to: ${getLog}`, ip=0, timerId)
        }).catch(error => {
            res.statusCode = 400
            res.send("unknown error")
            logConsole.getResponseLog(`responded to: ${getLog}`, ip=0, withError=true)
        })
    }).catch(error => {
        final = error
        logConsole.getResponseLog(`responded to: ${getLog}`, ip=0, withError=true)
        res.statusCode = 400
        res.send(error)
    })

    
}