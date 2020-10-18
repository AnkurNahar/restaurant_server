const itemControllers = require('../controllers/item');
const autenticate = require('../middlewares/authenticate');

const { Router } = require('express');

const router = Router();

const itemRoutes = (app) => {

    router.get('/', autenticate.authenticateToken, itemControllers.getItems);

    app.use('/items', router);
}

module.exports = itemRoutes;