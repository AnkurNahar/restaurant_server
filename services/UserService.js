const jwt = require('jsonwebtoken');
const UserList = require('../models/User');
const RefreshTokens = require('../models/RefreshToken');
const bcrypt = require("bcrypt");

const userservice = {
  //to generate acccess token
  generateAccessToken: function (user) {
    //console.log(user);
    const token = jwt.sign(user, "secret", { expiresIn: "5m" });
   // console.log(token);
    return token;
  },

  loginUser: async function (userData) {
    try {
        const user = await UserList.query().findOne({email: userData.email});

        if(!user){ // if user dosent exist
            return {status: 401, message: 'user not found'};
       }

       //match password
       const matchPass = await bcrypt.compare(userData.password, user.password);

       if (!matchPass) {
 
        return {
            status: 400,
            msg: "Password does not match"
        };
       }

        const accessToken = this.generateAccessToken({user});
        const refreshToken = jwt.sign({user}, 'refresh');
        await RefreshTokens.query().insert({
            userID: user.id, 
            token: refreshToken
        });
        

      return { status: 200, accessToken: accessToken, refreshToken: refreshToken, user};
    } catch (err) {
      console.log(err);
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

  checkForEmail: async function (user) {
    try {

      //const email = await UserList.query().select('id').where({ email: user.email });
      const email = await UserList.query().findOne({ email: user.email });
      console.log(email);
      if(email){
        return { status: 400, msg: 'Email already in use' };
      }

     return { status: 200, msg: 'Email not in use' };

    } catch(err) {
      return { status: 500, msg: "Internal server error!" };
    }
  },

  signupUser: async function (user) {
    try {
      console.log(user);
         

          console.log("enters signup service");

          //encrypt password
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(user.password, salt);

          console.log(hash);
            
          //adding user
          const userToken = await UserList.query().insert({
            userName: user.userName, 
            email: user.email,
            password: hash
        });

        console.log(userToken);
        return { status: 200, success: true, msg: 'Registration Successful!'};

    } catch (err) {
      console.log(err);
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
        if (refreshToken === null){
            return { status: 401 }
        } 

        const dbToken = await RefreshTokens.query().select('id').findOne({token: refreshToken});
        if(!dbToken){
            return { status: 403, msg: 'Refresh token does not match' }
        }

        const decode = jwt.verify(refreshToken, 'refresh');

        if(decode){
          const accessToken = this.generateAccessToken(decode.user)
          return { status: 200, accessToken };
        }

        /* const test = jwt.verify(refreshToken, 'refresh', (err, user) => {
            if (err) {
             return { status: 403 };
            }

            const accessToken = this.generateAccessToken({user});
            console.log("in generate tokn "+accessToken);
            return { status: 200, accessToken };
        })*/

        //console.log(decode); 
        

    }catch (err) {
      console.log(err);
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