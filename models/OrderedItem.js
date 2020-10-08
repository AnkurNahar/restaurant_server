const {Model} = require('objection');
class OrderedItem extends Model{
    static get tableName(){
        return 'orderitems';
    }
}

module.exports = OrderedItem;