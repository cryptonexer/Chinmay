const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './secure.env' });
const User = require('./model/PartyregSchema');
const Voter = require('./model/VoterregSchema')
const port = process.env.PORT;
const bodyparser = require('body-parser');
const cors = require('cors');
const fs = require('fs');




//middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use('/partysymbol', express.static('../server/Images/Party'));
app.use(require('./routes/admin'));
app.use(require('./routes/party'));
app.use(require('./routes/voter'));
app.use(express.json());
require('./db/conn');




//RESULT PAGE
app.get('/voter/result/:id', (req, res) => {

  const pID = req.params.id;

  Voter.find({ Vt: pID }).exec((err, result) =>{
    if(err) throw err;
    res.send(result)
  })
});


app.get('/party/result', (req, res) => {
  
  User.find({}).exec((err, result) =>{
    if(err) throw err;
    res.send(result)
  })
});

app.get('/voter/proofOfWork/:id', (req, res)=>{

  let voterid = req.params.id;
  let raw = fs.readFileSync('./transactions/' +voterid+ '.json');
  const data = JSON.parse(raw);
  res.send(data);


})


// //creating transactions for vote
// app.get('/api/voter/votertrans/:id1/:id2', async (req, res) => {

//   const voteStat = "true";
//   try {
//       const voterid = req.params.id1;
//       let voterdata = await Voter.findById(voterid).exec();

//       const Partyid = req.params.id2;
//       let partydata = await User.findById(Partyid).exec();

//       const unique_ID = voterdata._id;
//       const From = voterdata.Email;
//       const party_uID = partydata._id;
//       const To = partydata.Email;

//       Voter.findByIdAndUpdate(voterid, { Vt: Partyid },
//           function (err, result) {
//               if (err)
//                   console.log(err);
//           })

//       Voter.findByIdAndUpdate(voterid, { VoteStatus: voteStat },
//           function (err, result) {
//               if (err)
//                   console.log(err);
//           })


//       const data = {
//           UnqiueId: unique_ID,
//           From: From,
//           Party: party_uID,
//           To: To
//       }

//       fs.writeFile(`./transactions/${voterid}.json`, JSON.stringify(data, null, 2), (err) => {
//           if (err) throw err
//       })

//   } catch (error) {
//       if (error) throw error
//   }
// });


//===================================================================


//
//server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})