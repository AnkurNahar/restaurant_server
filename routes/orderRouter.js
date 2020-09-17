const express = require("express");
const bodyParser = require("body-parser");
const mailgun = require("mailgun-js");
var db = require("../db_connection");
const autenticate = require('../authenticate');


const orderRouter = express.Router();

//mailgun config
const DOMAIN = "sandbox68e8d49e4d5340fea3e662585617e15b.mailgun.org";
const mg = mailgun({
  apiKey: "1c56eb7b457a32eeda4f818fc092223e-0f472795-11c55c24",
  domain: DOMAIN,
});

//allows parsing of response body in JSON format
orderRouter.use(bodyParser.json());

//placing order
orderRouter.route("/").post(autenticate.authenticateToken, async (req, res, next) => {
  try {
    if (!req.body.userID || !req.body.items) {// checking for userID and items array in req body
      res.status(400);
      res.json({ message: "Bad Request" });
    } else {
      
      //adding order to order table
      const sql1 = "INSERT INTO orders SET `userID` = ?";
      const result1 = await db.query(sql1, [req.body.userID]);

      //adding items to orderitems table
      const orderID = result1.insertId;
      const sql2 = "INSERT INTO orderitems SET `orderID` = ?, `itemID` = ?, `quantity` = ?  ";

      function insertItem() {
        req.body.items.forEach((item) => {
          let result2 = db.query(sql2, [orderID, item.itemID, item.quantity]);
        });
      }
      const insert = await insertItem();

      //getting ordered items price and quantity
      const sql3 =
        "SELECT item.itemName AS name, item.price AS price, orderitems.quantity AS quantity FROM orderitems INNER JOIN item ON orderitems.itemID = item.itemID WHERE `orderID` = ?";
      const result3 = await db.query(sql3, [orderID]);

      const sql4 = "SELECT email from user WHERE `userID` = ?"
      const result4 = await db.query(sql4,[req.body.userID]);

      const recipient = result4[0].email;

      console.log(recipient)

      //calculating total cost
      let total = 0.0;
      let cost = 0.0;
      result3.forEach((item) => {
        cost = item.price * item.quantity;
        item.cost = cost;
        total += cost;
      });

    
     //sending mail
      const data = {
        from: "Restaurant <me@samples.mailgun.org>",
        to: recipient,
        subject: "Order Confirmation",
        html: "<html>"+
        "<body>"+
        "<h3>Your order was placed successfully!</h3>"+
        "<h1>Total Price: "+ total +"TK</h1>"+
        "</body>"+
        "</html>"
      };

      mg.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        }
        console.log(body);
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({result3, totalCost: total });
    }
  } catch (error) {
    return next(error);
  }
});


module.exports = orderRouter;
