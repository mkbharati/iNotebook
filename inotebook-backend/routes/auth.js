const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
require("dotenv").config();
const JWT_SECRET = process.env.JWT_TOKEN;
console.log(JWT_SECRET);

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: 'User already exist' })
        }
        const salt =await bcrypt.genSalt(10)  //Salt of 10 length
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Inter Server Occured")
    }

})

router.post('/login', [
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req,res)=>{
    let success = false;
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()})
    }
    
    try {
        const {email, password} = req.body
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"Invalid Ceredentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error:"Invalid Ceredentials"})
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

router.post('/getuser', fetchuser , async (req,res)=>{
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select('-password');
        //if(!user)res.send('User not exist')
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server occured')
    }
})

module.exports = router
