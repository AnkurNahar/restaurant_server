const {Model} = require('objection');
class RefreshToken extends Model{
    static get tableName(){
        return 'tokens';
    }

    static get idColumn(){
        return 'id';
    }
}

module.exports = RefreshToken;