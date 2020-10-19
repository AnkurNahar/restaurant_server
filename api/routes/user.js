const userControllers = require('../controllers/user');
const autenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validator');

const { Router } = require('express');

const router = Router();

const userRoutes = (app) => {

    router.post('/login', validate.sanitizeForm, userControllers.loginUser);

    router.post('/token', userControllers.generateRefreshToken);

    router.post('/signup', validate.sanitizeForm, validate.validateSignUp, userControllers.signupUser);

    router.patch('/update', autenticate.authenticateToken, userControllers.updateUserInfo);

    router.delete('/logout', autenticate.authenticateToken, userControllers.logoutUser);

    router.delete('/remove', autenticate.authenticateToken, userControllers.deleteUser);

    app.use('/users', router);
}

module.exports = userRoutes;