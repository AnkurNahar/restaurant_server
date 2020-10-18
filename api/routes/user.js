const userControllers = require('../controllers/user');
const autenticate = require('../middlewares/authenticate');

const { Router } = require('express');

const router = Router();

const userRoutes = (app) => {

    router.post('/login', userControllers.loginUser);

    router.post('/token', userControllers.generateRefreshToken);

    router.post('/signup', userControllers.signupUser);

    router.patch('/update', autenticate.authenticateToken, userControllers.updateUserInfo);

    router.delete('/logout', autenticate.authenticateToken, userControllers.logoutUser);

    router.delete('/remove', autenticate.authenticateToken, userControllers.deleteUser);

    app.use('/users', router);
}

module.exports = userRoutes;