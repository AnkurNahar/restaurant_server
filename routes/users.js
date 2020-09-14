var express = require('express');
var passport = require('passport');
var router = express.Router();
const bodyParser = require('body-parser');
var db  = require('../db_connection');

router.use(bodyParser.json());


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', (req, res, next) => {


  /* User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  }); */
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'});
});

router.get('/logout', (req, res) => {
  if (req.session) {
    //clearing session and cookies
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.put('/update', async (req, res, next) => {


  try {
    if(!req.body.userID||
      !req.body.userName||
      !req.body.email||
      !req.body.address){ // checking for userID, userName, email and address in req body
      res.status(400);
      res.json({message: "Bad Request"});
    } else { //updating user info
      const sql = "UPDATE user SET `userName` = ?, `email` = ?, `address` = ? WHERE `userID` = ?";
      const result = await db.query(sql, [req.body.userName, req.body.email, req.body.address, req.body.userID])
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({message: "Updated"});
    }
    
  } catch (error) {
    return next(error);
  }


  
//using callback
 /* if(!req.body.userID||
    !req.body.userName||
    !req.body.email||
    !req.body.address){ // checking for userID, userName, email and address in req body
    res.status(400);
    res.json({message: "Bad Request"});
  } else { //updating user info

    var sql = "UPDATE user SET `userName` = ?, `email` = ?, `address` = ? WHERE `userID` = ?";
    
        db.query(sql, [req.body.userName, req.body.email, req.body.address, req.body.userID],function (err, result, fields) {
          if (err) throw err;
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({message: "Updated"});
        });
  } */

});

router.delete('/remove', async (req, res, next) => {


  try {
    if(!req.body.userID){ // checking for userID, userName, email and address in req body
      res.status(400);
      res.json({message: "Bad Request"});
    } else { //updating user info
      const sql = "DELETE FROM user WHERE `userID` = ?";
      const result = await db.query(sql, [req.body.userID])
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({message: "User Deleted"});
    }
    
  } catch (error) {
    return next(error);
  } 
  

  //using callback
  /* if(!req.body.userID){ // checking for userID in req body
    res.status(400);
    res.json({message: "Bad Request"});
  } else { //deleting user

    var sql = "DELETE FROM user WHERE `userID` = ?";
    
        db.query(sql, [req.body.userID], function (err, result, fields) {
          if (err) throw err;
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(result);
        });
  } */

  
  
});

module.exports = router;
