const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require("mailgun-js");
var db  = require('../db_connection');


const orderRouter = express.Router();
const DOMAIN = 'sandbox68e8d49e4d5340fea3e662585617e15b.mailgun.org';
const mg = mailgun({apiKey:'1c56eb7b457a32eeda4f818fc092223e-0f472795-11c55c24', domain: DOMAIN});
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'ankurnahar.an@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};

//allows parsing of response body in JSON format
orderRouter.use(bodyParser.json());

//placing order
orderRouter.route('/')
.post(async (req,res,next) => {
    //get recipt 

    try {
        if(!req.body.userID||
           !req.body.items){ // checking for userID and items array in req body
          res.status(400);
          res.json({message: "Bad Request"});
        } else { 
          //adding order to order table
          const sql1 = "INSERT INTO orders SET `userID` = ?";
          const result1 = await db.query(sql1, [req.body.userID])

          //adding items to orderitems table
          const orderID = result1.insertId;
          const sql2 = "INSERT INTO orderitems SET `orderID` = ?, `itemID` = ?, `quantity` = ?  "; 
          
          function insertItem (){
            req.body.items.forEach(item => {
                let result2 = db.query(sql2, [orderID, item.itemID, item.quantity])
              });
          }
          const insert = await insertItem();
          
          //getting ordered items price and quantity
          const sql3 = "SELECT item.price AS price, orderitems.quantity AS quantity FROM orderitems INNER JOIN item ON orderitems.itemID = item.itemID WHERE `orderID` = ?"
          const result3 = await db.query(sql3, [orderID])

          //calculating total cost
          let total = 0.0;
          function calcCost (){
            result3.forEach(item => {
                total += item.price*item.quantity;
              });
          }
          const calculate = await calcCost();

         
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
         //res.json({message: "Order Confirmeed"});
          res.json(result3);
        }
        
      } catch (error) {
        return next(error);
      }
});

//placing order
orderRouter.route('/mail')
.post((req,res,next) => {
    //get recipt 

mg.messages().send(data, function (error, body) {
    if(error) {
    console.log(error);
    }
	console.log(body);
});
});


module.exports = orderRouter;