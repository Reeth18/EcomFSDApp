const jwt = require("jsonwebtoken");

// create a middleware
async function jwtVerify(req, res, next) {
  // some sort of logic is there to check our tokens coming from the client
  // if token is valid then we pass the control to the next controller or the middleware
  // if token is invalid we send a response to the client
//   Bearer_keyword, token
  let token;
//   console.log(req.headers);
    try {
        // if (req.headers && req.headers.authorization)
        if (!req.headers.authorization){
            // console.log(req.headers.authorization, " tokens coming from here");
            // Store the token
            return res.status(403).json({
                message: "no token in authorization"
            });
        }
        let bearerToken = req.headers.authorization;
            // Bearer token
            // ['Bearer', 'token']
            token = bearerToken.split(' ')[1];
            // console.log(token, " this is token");
        
            // verify tokens
            const decoded = await jwt.verify(token, process.env.JWT_SECRETKEY);
            console.log(decoded);
            if(!decoded){
                return res.status(400).json({
                    message: 'Token is not valid'
                })
            }
        
            // the next will move to getAllUser controller the moment the previous if else is not executed
            next();
            // return res.status(200).json({
            //     message: , 
            // })
    } catch (error) {
        console.log(error, "coming from the JWT middleware");
        return res.status(400).json({
            message: `Something went wrong ${error.message}`,
        })
    }
  
}

module.exports = jwtVerify;
