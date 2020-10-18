const userService = require('../../services/UserService');


const loginUser = async (req, res) => {

    const userInfo = await userService.loginUser(req.body);
    return res.status(userInfo.status).json(userInfo);
}

const signupUser = async (req, res) => {

    const userSignup = await userService.signupUser(req.body);
    return res.status(userSignup.status);
}

const updateUserInfo = async (req, res) => {
    
    const updatedInfo = await userService.updateUserInfo(req.body);
    return res.status(updatedInfo.status).json(updatedInfo);
}

const generateAccessToken = async (req, res) => {

    const accessToken = await userService.generateToken(req.body);
    return res.status(accessToken.status).json(accessToken);
}

const logoutUser = async (req, res) => {

    const userLogout = await userService.logoutUser(req.body);
    return res.status(userLogout.status);
}

const deleteUser = async (req, res) => {

    const userRemoval = await userService.removeUser(req.body);
    return res.status(userRemoval.status);
}

module.exports = {
    loginUser,
    signupUser,
    updateUserInfo,
    generateAccessToken,
    logoutUser,
    deleteUser   
}