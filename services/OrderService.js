const { transaction } = require('objection');
const Orders = require('../models/Order');
const OrderItems = require('../models/OrderedItem');

const orderService = {
    placeOrder: async function (orderDetails) {
        try {
            if (!orderDetails.userID || !orderDetails.items) {// checking for userID and items array in req body
                return { status: 400, msg: 'Bad request'  };
              }

              const result = await transaction(Orders.knex(), async trx => {

                const result1 = await Orders.query(trx).insert({ userID: orderDetails.userID });

                const orderID = result1.insertId;

                //adding items to orderitems table
                orderDetails.items.forEach((item) => {
                    await OrderItems.query(trx).insert({orderID: orderID, itemID: item.itemID, quantity: item.quantity});
                });

                const itemArray = await Orders.relatedQuery('item').where({ orderID: orderID});
                let total = 0.0;
                let cost = 0.0;
                const mappedArray = itemArray.map((item) => {
                    cost = item.price * item.quantity;
                    item.cost = cost;
                    total += cost;
                });
                return {mappedArray, total: total};

              });
            
              return {result}
        } catch(err){
            console.log(err);
        }
    }   

}

module.exports = orderService;