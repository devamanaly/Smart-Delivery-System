const FindAllOrder = require('../models/order')

const getOrders = async (req, res) => {
    const {userId, role } = req.user;
    try {
        console.log("i am here")
        const orders = await FindAllOrder(userId , role)
        res.status(200).json({ orders })
    }
    catch (err) {
        res.status(500).json({ error: `Invalid Errorssss:  ${err}` })
        // console.log("i am here")

    }

}

module.exports = getOrders