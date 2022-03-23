const Jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {

    let token = req.headers['x-access-token'];
   
    
    try {
        if(token){
            const user = Jwt.verify(token, process.env.SECRETKEY);
            
            req.user = user;
            req.Party_name = user.Party_name;
            req.Candidate_name = user.Candidate_name;
            req.Email = user.Email;
            req.Slogan = user.Slogan;
            req.Description = user.Description;

            next();
            }

    } catch (error) {
        return res.status(403).json({error: 'No Token'});
    }

}

module.exports = verifyToken;