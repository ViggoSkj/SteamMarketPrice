const stripe = require("stripe")(process.env.STRIPE_API_KEY)

module.exports.checkout = async function(req, res){
    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types:['card'],
        line_items:[
            {
                price: process.env.PRICE_ID,
                quantity: 1
            }
        ],
        success_url:
        "http://localhost:8000",
        cancel_url:
        "http://localhost:8000",

    });

    res.send(session)
}