import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import Anime from './Components/Splash/Animation'
import Home from './Components/Index'

import Result from './Components/Admin/Result';

import PartyDashboard from './Components/Party/PartyDashboard'
import Partyreg from './Components/Party/Partyreg'
import Partylogin from './Components/Party/Partylogin'

import Details from './Components/Admin/Admin'
import Adlogin from './Components/Admin/Adminlogin'
import Pdetails from './Components/Party/PartyProfile'
import PartyAuth from "./Components/PartyAuth"

import VoterAuth from './Components/VoterAuth'
import VoterDashboard from './Components/Voters/VoterDashboard'
import Voterreg from './Components/Voters/Voterreg'
import Voterlogin from './Components/Voters/Voterlogin'
import { useEffect, useState } from 'react';

function App() {

  return (

    <div>
      <Router>
      <Routes>
        <Route path="/anime" element={<Anime />} />
        <Route path="/" element={<Home/>} />
        <Route path="/PartyDashboard" element={<PartyDashboard/>} />
        <Route path="/partyreg" element={<Partyreg/>} />
        <Route path="/partylogin" element={<Partylogin/>} />
        
        <Route path="/Voter/" element={<Voterlogin />}/>
        <Route path="/VoterDashboard" element={<VoterDashboard />}/>
        <Route path="/VoterReg" element={<Voterreg />}/>
        <Route path="/VoterLogin" element={<Voterlogin />}/>
        <Route path='/Voter/auth' element={<VoterAuth/>}/>

        <Route path='/admin' element={<Details/>}/>
        <Route path='/adminlogin' element={<Adlogin/>}/>
        <Route path='/partydetail' element={<Pdetails/>}/>
        <Route path='/party/auth' element={<PartyAuth/>}/>

        <Route path='/results' element={<Result/>}/>

      </Routes>
   </Router>
    </div>
    
    
       
  );
}

export default App;
