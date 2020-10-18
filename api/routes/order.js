const orderControllers = require('../controllers/order');
const autenticate = require('../middlewares/authenticate');

const { Router } = require('express');

const router = Router();

const orderRoutes = (app) => {

    router.post('/', autenticate.authenticateToken, orderControllers.placeOrder);

    app.use('/order', router);
}

module.exports = orderRoutes;