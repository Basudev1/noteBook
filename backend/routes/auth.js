const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

//Api End Point for Creating user Does not require Authentication
router.post('/createuser', [
   
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Passwords must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    //validating user post data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with the same email exists
    try{
    let user = await User.findOne({ email: req.body.email });
    if(user){
      return res.status(400).json({ errors: [{ msg: 'User with that email already exists' }] });
    }
     else{
       User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
      res.json("message: User Created Successfully");
    }
  }catch(error){
    console.log(error.message);
    res.send('Status: 500 Internal Server Error');
  }
  
      // .then(user => res.json(user)).catch(err => console.log(err),
      // res.json({'error': 'User already exists', message: err.message}));
      
})
module.exports = router;