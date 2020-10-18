const ItemList = require('../models/Item')

const itemService = {

    getItems: async function () {

        try {

            const items = await ItemList.query();
            return { status: 200, items }

        } catch(err) {
            return { status: 500, msg: "Internal Server Error!" };
        }
    }
}

module.exports = itemService;