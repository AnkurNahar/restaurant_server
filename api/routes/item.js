const itemControllers = require('../controllers/item');

const { Router } = require('express');

const router = Router();

const itemRoutes = (app) => {

    router.get('/', itemControllers.getItems);

    app.use('/items', router);
}

module.exports = itemRoutes;