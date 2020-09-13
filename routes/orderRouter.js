const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require("mailgun-js");


const orderRouter = express.Router();
const DOMAIN = 'sandbox68e8d49e4d5340fea3e662585617e15b.mailgun.org';
const mg = mailgun({apiKey:'1c56eb7b457a32eeda4f818fc092223e-0f472795-11c55c24', domain: DOMAIN});
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'ankurnahar.an@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};

//allows parsing of response body in JSON format
orderRouter.use(bodyParser.json());

//placing order
orderRouter.route('/')
.post((req,res,next) => {
    //get recipt 
});

//placing order
orderRouter.route('/mail')
.post((req,res,next) => {
    //get recipt 

mg.messages().send(data, function (error, body) {
    if(error) {
    console.log(error);
    }
	console.log(body);
});
});


module.exports = orderRouter;