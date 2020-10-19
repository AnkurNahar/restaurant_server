const jwt = require('jsonwebtoken');
const userControllers = require('../controllers/user');

//to verify access token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, 'secret', (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  //to check if email not used
  function checkEmail(req, res, next) {
    const emailInfo = userControllers.checkForEmail;
    if(emailInfo.status !== 200){
      return res.sendStatus(emailInfo.status)
    }
    next()
  }

  module.exports = {
    authenticateToken,
    checkEmail
  };