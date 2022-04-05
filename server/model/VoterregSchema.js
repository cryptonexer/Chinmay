const mongoose = require('mongoose');

const VoterregSchema = new mongoose.Schema({
      First_name: {
            type: String,
            required:true
      },

      Last_name:{
            type: String,
            required: true
      },

      Email:{
            type: String,
            required: true,
            unique: true
      },
      
      Password:{
            type: String,
            required: true
      },

      ProfileStatus:{
            type: String,
            required: true
      },

      VoteStatus:{
            type: String,
            required: true
      },

      Vt:{
            type: String,
            required: true
      },

      Pow:{
            type: String,
            required: true

      }

      
})


const Voterreg = mongoose.model('voters',VoterregSchema);

module.exports = Voterreg;