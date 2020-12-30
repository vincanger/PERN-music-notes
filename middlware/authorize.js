const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    // Get token from header
   
    const token = req.header("token"); //the function
    // console.log(req.headers); // the object
    // console.log(token); 

  
    // Check if not token
    if (!token) {
      return res.status(403).json({ msg: "authorization denied" });
    }
  
    // Verify token
    try {
      //it is going to give the user id (user:{id: user.id})
      const verify = jwt.verify(token, process.env.jwtSecret);
  
      req.user = verify.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
  };


// const authorize = (req, res, next) => {
//     try {
//         const jwtToken = req.header("token");
//         if (!jwtToken) {
//             return res.status(403).json('Not Authorized nonono');
//         }

//         const payload = jwt.verify(jwtToken, process.env.jwtSecret);
//         console.log(payload);
        
//         req.user = payload.user;

//     } catch (error) {
//         console.error(error.message);
//         return res.status(403).json('Not Authorized nono');
//     }

//     next();
// }


// module.exports = authorize;