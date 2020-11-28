const userControllers = require('../controllers/user');
const {authenticateToken} = require('../middlewares/authenticate');
const {checkEmail} = require('../middlewares/authenticate');
const {sanitizeForm} = require('../middlewares/validator');
const {validateSignUp} = require('../middlewares/validator');

const { Router } = require('express');

const router = Router();

const userRoutes = (app) => {

    router.post('/login', sanitizeForm, userControllers.loginUser);

    router.post('/token', userControllers.generateAccessToken);

    router.post('/signup', sanitizeForm, validateSignUp, checkEmail, userControllers.signupUser);

    router.patch('/update', authenticateToken, userControllers.updateUserInfo);

    router.delete('/logout', authenticateToken, userControllers.logoutUser);

    router.delete('/remove', authenticateToken, userControllers.deleteUser);

    app.use('/users', router);
}

module.exports = userRoutes;