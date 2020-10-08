const orderControllers = require('../controllers/order');

const { Router } = require('express');

const router = Router();

const orderRoutes = (app) => {

    router.post('/', orderControllers.placeOrder);

    app.use('/order', router);
}

module.exports = orderRoutes;