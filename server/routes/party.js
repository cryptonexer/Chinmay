const express = require('express');
const server = express.Router();
const User = require('../model/PartyregSchema');
const multer = require('multer');
const Jwt = require('jsonwebtoken');
const verifypartyuser = require('../middleware/verifyPartyToken');
var md5 = require('md5');



//middleware
//image upload and storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../server/Images/Party')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({
  storage: storage
}).single('File');



//party register route
server.post('/api/party/register', upload, async (req, res) => {
  const { Party_name, Candidate_name, Email, Phone, Slogan, Description, Password, Cpassword } = req.body;

  const file = req.file.filename;

  if (!Party_name || !Candidate_name || !Email || !Phone || !Slogan || !Description || !Password || !Cpassword) {
    return res.json({ Status: 'Please Enter all details' });
  }

  if (Password !== Cpassword) {
    return res.json({ Status: 'Please Enter Same Password' });
  }

  const Stat = "Inactive";
  var hashPass = md5(Password);

  try {
    const newUser = await User.create({
      Party_name: Party_name,
      Candidate_name: Candidate_name,
      Email: Email,
      Phone: Phone,
      Slogan: Slogan,
      Description: Description,
      Password: hashPass,
      Status: Stat,
      Image: file,
      Count: 0
    })
    if (newUser) {
      res.json({ Status: 'ok' });
    }
  } catch (error) {
    res.json({ Status: 'error', error: 'Duplicate email' });
  }
});


//Party Login route
server.post('/api/party/login', async (req, res) => {

  var hashPass = md5(req.body.Password);


  const user = await User.findOne({ Email: req.body.Email, Password: hashPass })

  if (user) {
    const token = Jwt.sign({
      Party_name: user.Party_name,
      Candidate_name: user.Candidate_name,
      Email: user.Email,
      Slogan: user.Slogan,
      Description: user.Description,
    }, process.env.SECRETKEY, {
      expiresIn: 25892000000
    });

    res.json({
      Status: 'ok', data: {
        token,
        user: {
          id: user._id,
          Email: user.Email
        }
      }
    });
  }
  else {
    res.json({ Status: 'error', user: false });
  }
});


//Party Profile route
server.get('/api/party/me', verifypartyuser, async (req, res) => {
  const rootuser = await User.findOne({ Email: req.Email });
  return res.json({ data: rootuser });
})




module.exports = server;