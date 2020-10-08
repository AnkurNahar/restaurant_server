const {Model} = require('objection');
class Item extends Model{
    static get tableName(){
        return 'item';
    }

    static get idColumn(){
        return 'itemID';
    }
}

module.exports = Item;