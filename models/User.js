const {Model} = require('objection');
const RefreshToken = require('./RefreshToken');
class User extends Model{
    static get tableName(){
        return 'user';
    }

    static get idColumn(){
        return 'id';
    }

    static get relationMappings(){
        return {
            token: {
                modelClass: RefreshToken,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'user.id',
                    to: 'tokens.userID'
                }
            }
        }
    }


}

module.exports = User;