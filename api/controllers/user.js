const userService = require('../../services/UserService');


const loginUser = async (req, res) => {

    const userInfo = await userService.loginUser();
    return res.status(userInfo.status).json(userInfo);
}

const signupUser = async (req, res) => {

    const userSignup = await userService.signupUser();
    return res.status(userSignup.status);
}

const updateUserInfo = async (req, res) => {
    
    const updatedInfo = await userService.updateUserInfo();
    return res.status(updatedInfo.status).json(updatedInfo);
}

const generateRefreshToken = async (req, res) => {

    const refreshToken = await userService.generateRefreshToken();
    return res.status(refreshToken.status).json(refreshToken);
}

const logoutUser = async (req, res) => {

    const userLogout = await userService.logoutUser();
    return res.status(userLogout.status);
}

module.exports = {
    loginUser,
    signupUser,
    updateUserInfo,
    generateRefreshToken,
    logoutUser   
}