const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Basuisgood$boy';

//Api End Point for Creating user Does not require Authentication
// router.post('/createuser', [
   
//     body('name', 'Enter a valid Name').isLength({ min: 3 }),
//     body('email', 'Enter a valid Email').isEmail(),
//     body('password', 'Passwords must be atleast 5 characters').isLength({ min: 5 }),
// ], async (req, res) => {

//     //validating user post data
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     //check whether the user with the same email exists
//     try{
//     let user = await User.findOne({ email: req.body.email });
//     if(user){
//       return res.status(400).json({ errors: [{ msg: 'User with that email already exists' }] });
//     }
//        const salt = await bcrypt.getSalt(10);
//        const secPass = await bcrypt.hash(req.body.password, salt);
//        User.create({
//         name: req.body.name,
//         password: secPass,
//         email: req.body.email,
//       })
//       res.json("message: User Created Successfully");
    
//   }catch(error){
//     console.log(error.message);
//     res.send('Status: 500 Internal Server Error');
//   }
  
//       // .then(user => res.json(user)).catch(err => console.log(err),
//       // res.json({'error': 'User already exists', message: err.message}));
      
// })
// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data ={
      user:{
        id: user.id,
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);
    res.json({authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
})
module.exports = router;