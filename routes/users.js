var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var db = require("../db_connection");
const jwt = require("jsonwebtoken");
const autenticate = require('../authenticate');


router.use(bodyParser.json());

//to generate acccess token
function generateAccessToken(user) {
  console.log(user)
  return jwt.sign(user, 'secret', { expiresIn: '35s' })
}

router.post("/login", async (req, res, next) => {
  try {
    var authHeader = req.headers.authorization;
    if (!authHeader) { //checking if auth header exists
      var err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      next(error);
      return;
    }

    //extracting username and password
    var auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    var username = auth[0];
    var pass = auth[1];

    //querying database for valid users
    const sql = "SELECT * FROM user";
    const result = await db.query(sql);
    let found = false;

    //returs user once found
    function getUser(){

      for (let index = 0; index < result.length; index++) {
        if (username == result[index].email && pass == result[index].pass) {
          const user = result[index];
  
          found = true;
          return user;
          
        } 
      }  
    

    } 

    const user = getUser();
    
    if(!found){ // if user dosent exist
      var err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      res.json({message: 'user not found'})
      err.status = 401;
      next(err);
    }

    const accessToken = generateAccessToken({user})
    console.log(accessToken)
    const refreshToken = jwt.sign({user}, 'refresh')
    const sql2 = "INSERT INTO tokens SET `userID` = ?, `token` = ?";
    const addToken = await db.query(sql2, [user.userID, refreshToken]);
    res.json({ accessToken: accessToken, refreshToken: refreshToken, user})

    

  }  catch (error) {
    return next(error);
  }
});


router.post('/token', async(req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null){
    return res.sendStatus(401)
  } 
  const tokenSql = "SELECT * FROM tokens"
  const refreshTokens = await db.query(tokenSql)
  for (let index = 0; index < refreshTokens.length; index++) {
    if (refreshTokens[index].token == refreshToken) {
      jwt.verify(refreshToken,'refresh', (err, user) => {
        if (err) {
          return res.sendStatus(403)
        }
        const accessToken = generateAccessToken({user})
        res.json({ accessToken: accessToken })
      })
    }
  }
  return res.sendStatus(403)
  
});

router.post("/signup", async(req, res, next) => {


  try {
    if (
      !req.body.userName ||
      !req.body.password ||
      !req.body.email ||
      !req.body.address
    ) {
      // checking for userName, password, email and address in req body
      res.status(400);
      res.json({ message: "Bad Request" });
    } else {
      //adding user
      const sql =
        "INSERT INTO user SET `userName` = ?, `email` = ?, `address` = ?, `pass` = ?";
      const result = await db.query(sql, [
        req.body.userName,
        req.body.email,
        req.body.address,
        req.body.password
      ]);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({success: true, status: 'Registration Successful!'});
    }
  } catch (error) {
    return next(error);
  }

});

router.delete("/logout", autenticate.authenticateToken, async(req, res, next) => {

  try{
    if (!req.body.refreshToken ) {// checking for refresh token in req body
      res.status(400);
      res.json({ message: "Bad Request" });
    } else {
      //deleting refresh token from bd
      const deleteSql = "DELETE FROM tokens WHERE `token` = ?";
      const result = await db.query(deleteSql, [req.body.refreshToken])
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Logged Out Successfully" });
    }

  }catch(error){
    return next(error);
  }
});

router.put("/update", autenticate.authenticateToken, async (req, res, next) => {
  try {
    if (
      !req.body.userID||
      !req.body.userName ||
      !req.body.email ||
      !req.body.address
    ) {
      // checking for userID, userName, email and address in req body
      res.status(400);
      res.json({ message: "Bad Request" });
    } else {
      //updating user info
      const sql =
        "UPDATE user SET `userName` = ?, `email` = ?, `address` = ? WHERE `userID` = ?";
      const result = await db.query(sql, [
        req.body.userName,
        req.body.email,
        req.body.address,
        req.body.userID
      ]);
      console.log("userId"+req.user.user.userID)
      console.log("user"+req.user)
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "Updated" });
    }
  } catch (error) {
    return next(error);
  }
});

router.delete("/remove", autenticate.authenticateToken, async (req, res, next) => {
  try {
    if (!req.body.userID) {
      // checking for userID in req body
      res.status(400);
      res.json({ message: "Bad Request" });
    } else {
      //updating user info
      const sql = "DELETE FROM user WHERE `userID` = ?";
      const result = await db.query(sql, [req.body.userID]);
      //destroy web token
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ message: "User Deleted" });
    }
  } catch (error) {
    return next(error);
  }
});







module.exports = router;
