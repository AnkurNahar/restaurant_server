

const userservice = {

    loginUser: async function () {

        try {

            const userInfo = 0;
            return { status: 200, userInfo };

        } catch(err) {
            return { status: 500, msg: 'Internal server error!' }
        }
    },

    logoutUser: async function () {

        try {

            return { status: 200};

        } catch(err) {
            return { status: 500, msg: 'Internal server error!' }
        }
    },

    signupUser: async function () {

        try {

            return { status: 200 };

        } catch(err) {
            return { status: 500, msg: 'Internal server error!' }
        }
    },

    updateUserInfo: async function () {

        try {

            const updatedInfo = 0;
            return { status: 200, updatedInfo };

        } catch(err) {
            return { status: 500, msg: 'Internal server error!' }
        }
    },

    generateRefreshToken: async function () {

        try {

            const refreshToken = 0;
            return { status: 200, refreshToken };

        } catch(err) {
            return { status: 500, msg: 'Internal server error!' }
        }
    }


}

module.exports = userservice;