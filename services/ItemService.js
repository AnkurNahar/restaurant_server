

const itemService = {

    getItems: async function () {

        try {

            const items = 0;
            return { status: 200, items }

        } catch(err) {
            return { status: 500, msg: "Internal Server Error!" };
        }
    }
}

module.exports = itemService;