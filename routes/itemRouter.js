const express = require('express');
const bodyParser = require('body-parser');
var db  = require('../db_connection');


const itemRouter = express.Router();

//allows parsing of response body in JSON format
itemRouter.use(bodyParser.json());



//for /items
itemRouter.route('/')
.get( async (req,res,next) => {
    //querying DB for all items
    
    try {
      const sql = "SELECT * FROM item";
      const result = await db.query(sql);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(result); 
      
    } catch (error) {
      return next(error);
    }
      
 });




module.exports = itemRouter;