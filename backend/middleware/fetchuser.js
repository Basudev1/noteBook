const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Basuisgood$boy';
const fetchuser = (req, res, next) =>{
//Get the user from the Jwt token and add the id to it
const token = req.header('auth-token');
if(!token) {
    return res.status(401).send('Access denied. Please authenticate using a valid token.');
}
try {
    const data = jwt.verify(token, JWT_SECRET);
req.user = data.user;
} catch (error) {
    return res.status(401).send('Access denied. Please authenticate using a valid token.');
}

next();
}
module.exports = fetchuser;