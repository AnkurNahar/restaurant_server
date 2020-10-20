const { Router } = require("express");

const userRoutes = require("./routes/user");
const itemRoutes = require("./routes/item");
const orderRoutes = require("./routes/order");

const loadRoutes = () => {

    const router = Router();

    userRoutes(router);
    itemRoutes(router);
    orderRoutes(router);
    

    return router;
}

module.exports = loadRoutes;
