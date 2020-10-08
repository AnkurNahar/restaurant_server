

const orderService = {
    placeOrder: async function () {
        try {

            const memo = 0;
            return { status: 200, memo };

        } catch (err) {
            return { status: 500, msg: 'Internal server error!' };

        }
    }
}

module.exports = orderService;