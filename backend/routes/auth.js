const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Api End Point Does not require Authentication
router.post('/', (req, res) => {
    const user = User(req.body);
    user.save(); 
   res.send(req.body);
   console.log(req.body);
})
module.exports = router;