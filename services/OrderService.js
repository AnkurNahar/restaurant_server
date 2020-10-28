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

                const order = await Orders.query(trx).insert({ userID: orderDetails.userID });

                const orderID = order.orderID;

                await Promise.all(
                    orderDetails.items.map(item => {
                        return OrderItems.query(trx).insert({orderID: orderID, itemID: item.itemID, quantity: item.quantity});
                    })
                );

                const itemArray = await Orders.query(trx).withGraphFetched('item').findOne({ orderID: orderID });

                let total = 0.0;
                let cost = 0.0;

                const items = itemArray.item.map((item) => {
                    cost = item.price * item.quantity;
                    item.cost = cost;
                    total += cost;
                    return item;
                });

                return {items, total: total};

              });

              return {status: 200,result};

        } catch(err){
            console.log(err);
            return { status: 500, msg: 'Internal error'  };
        }
    }   

}

module.exports = orderService;