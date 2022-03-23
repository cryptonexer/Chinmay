const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './secure.env' });
const cors = require('cors');
const User = require('./model/PartyregSchema');
const Admin = require('./model/Adminschema');
const Voter = require('./model/VoterregSchema')
const Jwt = require('jsonwebtoken');
const verifypartyuser = require('./middleware/verifyPartyToken');
const verifyvoter = require('./middleware/verifyVoterToken')
const port = process.env.PORT;
const fs = require('fs');
const multer = require('multer');
//Encryption
var md5 = require('md5');
var aes256 = require('aes256');
const key = process.env.ENCRYPTIONKEY;



//image upload and storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Images/Party')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({
  storage: storage
}).single('File');



//middleware
app.use('/partysymbol', express.static('./Images/Party'));
app.use(express.json());
app.use(cors());
require('./db/conn');





//party register route
app.post('/api/party/register', upload, async (req, res) => {
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
app.post('/api/party/login', async (req, res) => {

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
app.get('/api/party/me', verifypartyuser, async (req, res) => {
  const rootuser = await User.findOne({ Email: req.Email });
  return res.json({ data: rootuser });
})


//=============================================================================================================

//admin Userdetails route
app.get('/api/party/details', (req, res) => {
  User.find({}).exec((err, result) => {
    if (err) throw err;
    res.send({ data: result });
  })
})


//admin Userdetails route for active users
app.get('/api/activeUsers', (req, res) => {
  const Stat = 'Active';

  User.find({ Status: Stat }).exec((err, result1) => {
    if (err) throw err;
    res.send({ data1: result1 });
  })
});


//admin Userdetails route for Inactive users
app.get('/api/deactiveUsers', (req, res) => {
  const Stat = 'Inactive';

  User.find({ Status: Stat }).exec((err, result2) => {
    if (err) throw err;
    res.send({ data2: result2 });
  })
});


//Admin login route 
app.post('/api/adlogin', async (req, res) => {
  const user = await Admin.findOne({ Email: req.body.Email, Password: req.body.Password })

  if (user) {
    res.json({ Status: 'ok' })
  }
  else {
    res.json({ Status: 'error', user: false });
  }
});


//User Control Route: Activate
app.put('/api/activate', async (req, res) => {
  const id = req.body.id;
  const Stat = "Active";
  const update = await User.findByIdAndUpdate(id, { Status: Stat });

  if (update) {
    res.send({ status: update });
  }
  else {
    res.send({ error: 'Not Updated' });
  }
});


//User Control Route: Deactivate
app.put('/api/deactivate', async (req, res) => {
  const id = req.body.id;
  const Stat = "Inactive";
  const update = await User.findByIdAndUpdate(id, { Status: Stat });

  if (update) {
    res.send({ status: update });
  }
  else {
    res.send({ error: 'Not Updated' });
  }
});


//delete users
app.delete('/api/delete/:id', async (req, res) => {
  const id = req.params.id;
  const remove = await User.findByIdAndRemove(id).exec();

  res.send(remove);
})
//===================================================================

//ADMIN CONTROL FOR VOTERS
app.get('/api/Voter/details', (req, res) => {
  Voter.find({}).exec((err, result) => {
    if (err) throw err;
    res.send({ data: result });
  })
})


app.get('/api/activeVoters', (req, res) => {
  const Stat = 'Verified';

  Voter.find({ ProfileStatus: Stat }).exec((err, result1) => {
    if (err) throw err;
    res.send({ data1: result1 });
  })
});


app.get('/api/deactiveVoters', (req, res) => {
  const Stat = 'NotVerified';

  Voter.find({ ProfileStatus: Stat }).exec((err, result2) => {
    if (err) throw err;
    res.send({ data2: result2 });
  })
});


app.put('/api/Voter/verify', async (req, res) => {
  const id = req.body.id;
  const Stat = "Verified";
  const update = await Voter.findByIdAndUpdate(id, { ProfileStatus: Stat });

  if (update) {
    res.send({ status: update });
  }
  else {
    res.send({ error: 'Not Updated' });
  }
});


app.put('/api/Voter/decline', async (req, res) => {
  const id = req.body.id;
  const Stat = "NotVerified";
  const update = await Voter.findByIdAndUpdate(id, { ProfileStatus: Stat });

  if (update) {
    res.send({ status: update });
  }
  else {
    res.send({ error: 'Not Updated' });
  }
});



//========================================================================================


//Vote Login Route
app.post("/api/voter/register", async (req, res) => {
  const { First_name, Last_name, Phone, Email, Address, Taluka, City, Pincode, Aadhar, VoterID, Password, Cpassword } = req.body; 

  if (!First_name || !Last_name || !Phone || !Email || !Address || !Taluka || !City || !Pincode || !Aadhar || !VoterID || !Password || !Cpassword) {
    return res.json({ Status: 'Please Enter all details' });
  }

  if (Password !== Cpassword) {
    return res.json({ Status: 'Please Enter Same Password' });
  }

  
  const profileStat = "NotVerified";
  const voteStat = "false";
  const Pid = "none";
  const hashPass = md5(req.body.Password)
  try {
    const newVoter = await Voter.create({
      First_name: First_name,
      Last_name: Last_name,
      Email: Email,
      Password: hashPass,
      ProfileStatus: profileStat,
      VoteStatus: voteStat,
      Vt: Pid
    })

    if (newVoter) {
      res.json({ Status: 'ok' });
    }
  }
  catch (error) {
    if (error) throw error;
    res.json({ Status: 'error', error: 'Duplicate Email' });
  }

  var hashPincode = aes256.encrypt(key, Pincode);
  var hashAadhar = aes256.encrypt(key, Aadhar);
  var hashVoterID = aes256.encrypt(key, VoterID);
  var fileName = md5(First_name.concat(Last_name));


  let VoterData = {
    Name: First_name.concat(Last_name),
    Phone: Phone,
    Email: Email,
    Address: Address,
    Taluka: Taluka,
    City: City,
    Pincode: hashPincode,
    Aadhar: hashAadhar,
    Voter: hashVoterID
  }

  let data = JSON.stringify(VoterData, null, 2);
  fs.writeFileSync('./warehouse/' +fileName+ '.json', data, function (err) {
    if (err) {
      console.log(err);
    }
  });
});


// Voter Login route
app.post('/api/voter/login', async (req, res) => {

  const hashPass = md5(req.body.Password);
  const voter = await Voter.findOne({ Email: req.body.Email, Password: hashPass });

  if (voter) {
    const token = Jwt.sign({
      First_name: voter.First_name,
      Last_name: voter.Last_name,
      Email: voter.Email

    }, process.env.SECRETKEY, {
      expiresIn: 25892000000
    });
    res.json({
      Status: 'ok', data: {
        token,
        voter: {
          id: voter._id,
          Email: voter.Email
        }
      }
    });
  }
  else {
    res.json({ Status: 'error', user: false });
  }
})

//Party Profile route
app.get('/api/voter/me', verifyvoter, async (req, res) => {
  const rootuser = await Voter.findOne({ Email: req.Email });
  return res.json({ data: rootuser });
})


app.get('/voteballot/vote/:id', function (req, res) {
  const id = req.params.id;
  var i = 1;
  User.findById(id).exec((err, result) => {

    var count = result.Count;
    var newcount = count + i;


    User.findByIdAndUpdate(id, { Count: newcount }, function (err, result) {
      if (err) throw err;
      return res.send({ Status: newcount });
    })
  });




  //changing vote status to true
  /*app.put('/api/voter/votestat/:id', async (req, res) => {
    const id = req.params.id;
    const voteStat = "true";

    Voter.findByIdAndUpdate(id, { VoteStatus: voteStat }, function (err, result) {
      if (err) throw err;
      return res.send({ votestatus: voteStat })
    })
  })*/

  //creating transactions for vote
  app.get('/api/voter/votertrans/:id1/:id2', async (req, res) => {
    
    const voteStat = "true";
    try {
      const voterid = req.params.id1;
      let voterdata = await Voter.findById(voterid).exec();

      const Partyid = req.params.id2;
      let partydata = await User.findById(Partyid).exec();

      const unique_ID = voterdata._id;
      const From = voterdata.Email;
      const party_uID = partydata._id;
      const To = partydata.Email;

      Voter.findByIdAndUpdate(voterid, {Vt: Partyid}, 
        function(err, result){
          if(err) 
            console.log(err);
        })

        Voter.findByIdAndUpdate(voterid, {VoteStatus: voteStat}, 
          function(err, result){
            if(err) 
              console.log(err);
          })


      const data = {
        UnqiueId: unique_ID,
        From: From,
        Party: party_uID,
        To: To
      }

      fs.writeFile(`./transactions/${voterid}.json`, JSON.stringify(data, null, 2), (err) => {
        if (err) throw err
      })

    } catch (error) {
      if (error) throw error
    }
  })
})


//RESULT PAGE

app.get('/voter/result/:id', (req, res) => {

  const pID = req.params.id;


  Voter.find({ Vt: pID }).exec((err, result) =>{
    if(err) throw err;
    res.send(result)
  })


})

app.get('/party/result', (req, res) => {
  
  User.find({}).exec((err, result) =>{
    if(err) throw err;
    res.send(result)
  })


})



//===================================================================


//
//server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})