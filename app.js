const loadDB = require('./loaders/database');
const User = require('./models/User');
const Item = require('./models/Item');
const OrderedItem = require('./models/OrderedItem');
const Order = require('./models/Order');

loadDB();

const startApp = async () => {
    try{
        // const orders = await Order.query().withGraphFetched('item');
        // console.log(orders);
        // console.log(orders[0].item);

        const users = await Order.query().withGraphJoined('[user,item]');
        console.log(users[0].item);
    }catch(err){
        console.log(err);
    }
}

startApp();