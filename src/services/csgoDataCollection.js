const dataCollection = require("./steamMarketDataCollection")
const Error = require("./../utility/error")

function skinDataToName(skinData){
    return `${skinData.weapon} | ${skinData.skinName} (${skinData.wear})`
}

module.exports.getSkinData = function(skinData){
    return new Promise(function(resolve, reject){
        dataCollection.getItemId(skinDataToName(skinData), "csgo").then(result => {
            resolve(dataCollection.getItemData(result))
        }).catch(error => {
            if (error.type = Error.errorTypes["faulty input"]){
                reject({
                    type: Error.errorTypes["faulty input"],
                    message: "Could not find item id. Make shore the weapon, skin name and wear is properly capitalized and spelled."
                })
            }
        })
    })

}


