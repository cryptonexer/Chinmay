const Jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {

    let token = req.headers['x-access-token'];
   
    
    try {
        if(token){
            const voter = Jwt.verify(token, process.env.SECRETKEY);
            
            req.user = voter;
            req.First_name = voter.First_name,
            req.Last_name = voter.Last_name,
            req.Email = voter.Email;

            next();
            }

    } catch (error) {
        return res.status(403).json({error: 'No Token'});
    }

}

module.exports = verifyToken;