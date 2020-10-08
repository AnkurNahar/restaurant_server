const itemService = require('../../services/ItemService')

const getItems = async (req, res) => {

    const items = await itemService.getItems();
    return res.status(items.status).json(items);
}

module.exports = {
    getItems   
}