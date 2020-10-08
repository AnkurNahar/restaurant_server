const userControllers = require('../controllers/user');

const { Router } = require('express');

const router = Router();

const userRoutes = (app) => {

    router.post('/login', userControllers.loginUser);

    router.post('/token', userControllers.generateRefreshToken);

    router.post('/signup', userControllers.signupUser);

    router.patch('/update', userControllers.updateUserInfo);

    router.delete('/logout', userControllers.logoutUser)

    app.use('/users', router);
}

module.exports = userRoutes;