const itemControllers = require('../controllers/item');
const {authenticateToken} = require('../middlewares/authenticate');

const { Router } = require('express');

const router = Router();

const itemRoutes = (app) => {

    router.get('/', authenticateToken, itemControllers.getItems);

    app.use('/items', router);
}

module.exports = itemRoutes;