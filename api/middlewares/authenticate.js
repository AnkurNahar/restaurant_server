const jwt = require('jsonwebtoken');
const userService = require('../../services/UserService')

//to verify access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, 'secret', (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      return next()
    })
  }

  //to check if email not used
  async function checkEmail(req, res, next) {
    const emailInfo = await userService.checkForEmail(req.body);
    console.log("passed checkemail middleware");
    if(emailInfo.status !== 200){
      return res.sendStatus(emailInfo.status)
    }
    return next()
  }

  module.exports = {
    authenticateToken,
    checkEmail
  };