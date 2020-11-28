const {Model} = require('objection');
const Item = require('./Item');
const User = require('./User');
const OrderedItem = require('./OrderedItem');
class Order extends Model{
    static get tableName(){
        return 'orders';
    }

    static get idColumn(){
        return 'orderID';
    }

    static get relationMappings(){
        return {
            item: {
                modelClass: Item,
                relation: Model.ManyToManyRelation,
                filter: builder => builder.select("item.price", "orderitems.quantity", "item.itemName", "item.itemID"),
                join: {
                    from: 'orders.orderID',
                    through: {
                        from: 'orderitems.orderID',
                        to: 'orderitems.itemID'
                    },
                    to: 'item.itemID'
                }
            },

            user: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'orders.userID',
                    to: 'user.id'
                }
            }

        }
    }
}

module.exports = Order;