const jwt = require('jsonwebtoken');
const UserList = require('../models/User');
const RefreshTokens = require('../models/RefreshToken');

const userservice = {
  //to generate acccess token
  generateAccessToken: function (user) {
    console.log(user);
    return jwt.sign(user, "secret", { expiresIn: "5m" });
  },

  loginUser: async function (userData) {
    try {
        const user = await UserList.query().findOne({email: userData.email});

        if(!user){ // if user dosent exist
            return {status: 401, message: 'user not found'};
       }

       //match password

        const accessToken = generateAccessToken({user});
        const refreshToken = jwt.sign({user}, 'refresh');
        await RefreshTokens.query().insert({
            userID: user.userID, 
            token: refreshToken
        });
        

      return { status: 200, accessToken: accessToken, refreshToken: refreshToken, user};
    } catch (err) {
      return { status: 500, msg: "Internal server error!" };
    }
  },

  logoutUser: async function (userData) {
    try {
        if (!userData.refreshToken) {// checking for refresh token in req body
            return { status: 400, msg: 'Bad Request!' };
          }
          await RefreshTokens.query().delete().where({'token': userData.refreshToken});
          return { status: 200, message: "Logged Out Successfully"  };
    } catch (err) {
      return { status: 500, msg: "Internal server error!" };
    }
  },

  signupUser: async function (user) {
    try {
        if (
            !user.userName ||
            !user.password ||
            !user.email ||
            !user.address
          ) {// checking for userName, password, email and address in req body
            return { status: 400, msg: 'Bad requst' };
          } 

          //encrypt password
            
          //adding user
          await UserList.query().insert({
            userName: user.userName, 
            email: user.email,
            address: user.address,
            pass: user.password
        });
        return { status: 200, success: true, msg: 'Registration Successful!'};

    } catch (err) {
      return { status: 500, msg: "Internal server error!" };
    }
  },

  updateUserInfo: async function (userData) {
    try {

        if (
            !userData.userID||
            !userData.userName ||
            !userData.email ||
            !userData.address
          ) {// checking for userID, userName, email and address in req body
                return { status: 400, msg: 'Bad requst' };
            } 

            await UserList.query().patch({ 
                userName: userData.userName,
                email: userData.email,
                address: userData.address
            }).where({userID: userData.userID});

            return { status: 200,  msg: "Updated" };

    } catch (err) {
      return { status: 500, msg: "Internal server error!" };
    }
  },

  generateToken: async function (tokenData) {
    try {
        const refreshToken = tokenData.token
        if (refreshToken == null){
            return { status: 401 }
        } 

        const dbToken = await RefreshTokens.query().select('id').findOne({token: refreshToken});
        if(!dbToken){
            return { status: 403, msg: 'Refresh token does not match' }
        }


        jwt.verify(refreshToken, 'refresh', (err, user) => {
            if (err) {
             return { status: 403 };
            }

            const accessToken = generateAccessToken({user})
            return { status: 200, accessToken: accessToken };
        })

    }catch (err) {
      return { status: 500, msg: "Internal server error!" };
    }
  },


  removeUser: async function (userData){
    try {
      if (!userData.userID) {// checking for userID in req body
        return { status: 400, msg: 'Bad requst' };
      } 

      await UserList.relatedQuery('token').delete().where({id: userData.userID});
      
      return { status: 200,  msg: "User deleted!" };

    } catch (err) {
      return { status: 500, msg: "Internal server error!" };
    }
  }
};

module.exports = userservice;