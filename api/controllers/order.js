const orderService = require('../../services/OrderService');

const placeOrder = async (req, res) => {

    const memo = await orderService.placeOrder(req.body);
    return res.status(memo.status).json(memo);
}

module.exports = {
    placeOrder
}