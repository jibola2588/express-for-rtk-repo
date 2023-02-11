const bcrypt = require('bcrypt')
const joi = require('joi')
const express = require('express')
const { User } = require('../modules/user')
const genAuthToken = require("../utils/generateAuthToken")

const router = express.Router()

router.post('/',async(req,res) => {
    const schema = joi.object({ 
        email:joi.string().min(3).max(200).required().email(),
        password:joi.string().min(6).max(200).required()
    });

    const {error}  = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User?.findOne({ email: req?.body?.email});
   
    if(!user) return res.status(400).send("user does not exist");

    console.log('users exist in this login' + user.password )
    console.log('the body of request' + req.body.password)
   const isValid = await bcrypt.compare(req.body.password,user.password)
   
   if(!isValid) return res.status(400).send(" invalid email or password" );

   const token = genAuthToken(user);
 
   res.send(token)
})

module.exports = router