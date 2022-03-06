const axios = require("axios")
const { response } = require("express")
const logConsole = require("./../utility/logConsole")
const Error = require("./../utility/error")

/*

    current capabilities:
    
    get and items id by it's name and game

    get sell and buy orders of an item id

*/


const baseURL = "https://steamcommunity.com/market/"

const gameIDs = { // games market id in steam
    csgo: "730",
    teamfortres2: "440"
}

module.exports.getItemData = function(itemID) {
    return new Promise(function(resolve, reject){
        axios.get(baseURL + "itemordershistogram?country=SE&language=english&currency=3&item_nameid=" + itemID + "&two_factor=0").then(response2 => {
            const jsonResult = response2.data // the response json
            var endJson = {} // the json wich the api will deliver

            var buy_order_graph = jsonResult.buy_order_graph // all the buy orders

            // changes how the buy order is represented in a way i think make more sense
            var buy_order_list = [] // the buy orders that will be given to the api user
            prevSum = 0
            buy_order_graph.forEach(element => {

                // this is here because the original list says for example 5 pepole want to buy this for this or cheaper
                // so i just do some math to get the seperate values
                element[1] -= prevSum
                prevSum += element[1]
                
                var buyOrderData = {}
                buyOrderData.price = element[0] // the price 
                buyOrderData.amount = element[1] // the amount of buy orders at that price
                buyOrderData.currency = "euro" // gives in wich currency (may want to make so you can have different currencies)

                buy_order_list.push(buyOrderData)
            });

            // same thing as above but with sell orders
            var sell_order_graph = jsonResult.sell_order_graph
            var sell_order_list = []
            prevSum = 0
            sell_order_graph.forEach(element => {
                element[1] -= prevSum
                prevSum += element[1]

                var sellOrderData = {}
                sellOrderData.price = element[0]
                sellOrderData.amount = element[1]
                sellOrderData.currency = "euro"

                sell_order_list.push(sellOrderData)
            });

            // finalising the result json that the api will deliver to the api user
            endJson.buy_orders = buy_order_list
            endJson.sell_order_json = sell_order_list

            // TODO: implement saved data and automaticly update it if the get skin data is called and an hour or half has passed since last update 
            
            resolve(endJson)
        }).catch(error => {
            reject({message: error.message, status: error.response.status})
            logConsole.error(Error.errorTypes["error not defined yet"], "error not defind yet (error 2 in getItemIdByNameAndGame)")
            logConsole.warning("error not defined")
        })
    })
}

module.exports.getItemId = function(itemName, game) {
    return new Promise(function (resolve, reject) {
        axios.get(`${baseURL}listings/${gameIDs[game]}/${itemName}`).then(response => {
            const html = response.data
            
            // finds the item id from the steam page axios got
            const seartchFor = "Market_LoadOrderSpread" 
            const begginingIndex = html.search(seartchFor) + seartchFor.length+2 // gets the beggining of the id index
            var endingIndex = 0
            for (endingIndex = begginingIndex; "1234567890".includes(html[endingIndex]); endingIndex++);  

            const itemId = html.slice(begginingIndex, endingIndex) // slices the whole html into just the item id
            
            if (!/^\d+$/.test(itemId)){ // if the itemID it got dosent only contain numbers
                logConsole.error(Error.errorTypes["faulty input"], "User gave faulty input") // Shown in the console
                reject({ // error for the user
                    type: Error.errorTypes["faulty input"],
                    message: "input was faulty. Make shore that the item name and game is correct, the game you asigned may not be suported yet"})
            }

            resolve(itemId) // got an item id successfully
        })
    })
}