const { transaction } = require('objection');
const Orders = require('../models/Order');
const OrderItems = require('../models/OrderedItem');

const orderService = {
    placeOrder: async function (orderDetails) {
        try {
            if (!orderDetails.userID || !orderDetails.items) {// checking for userID and items array in req body
                return { status: 400, msg: 'Bad request'  };
              }

              const result = await transaction(Orders.knex(), async (trx) => {

                const result1 = await Orders.query(trx).insert({ userID: orderDetails.userID });

                console.log("result1- "+result1.orderID);

                const orderID = result1.orderID;

                console.log("orderID- "+orderID);



                //adding items to orderitems table
               const val = orderDetails.items.map(async (item) => {
                    const value = await OrderItems.query(trx).insert({orderID: orderID, itemID: item.itemID, quantity: item.quantity});
                    return value;
                });

                console.log(val);

                const itemArray = await Orders.relatedQuery('item').where({ orderID: orderID});
                console.log("itemArray: "+itemArray);
                let total = 0.0;
                let cost = 0.0;
                const mappedArray = itemArray.map((item) => {
                    cost = item.price * item.quantity;
                    item.cost = cost;
                    total += cost;
                });
                return {mappedArray, total: total};

              });
              console.log(result);
              return {status: 200,result}
        } catch(err){
            console.log(err);
            return { status: 500, msg: 'Internal error'  };
        }
    }   

}

module.exports = orderService;