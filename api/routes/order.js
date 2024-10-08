const orderControllers = require('../controllers/order');
const {authenticateToken} = require('../middlewares/authenticate');

const { Router } = require('express');

const router = Router();

const orderRoutes = (app) => {

    router.post('/', authenticateToken, orderControllers.placeOrder);

    app.use('/order', router);
}

module.exports = orderRoutes;