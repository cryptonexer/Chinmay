import React,{useEffect,useState} from 'react'
import Nav from './VoterNav'
import './Voter.css'
import { Container} from 'react-bootstrap'
import Ballot from './Votingballot'

const VoterDashboard = () => {

    const [userData,setUserData] = useState([]);
    
    const host = `http://localhost:3002`;
    const Welcome = async () => {
        const req = await fetch(`${host}/api/voter/me`,{
            headers:{
                'x-access-token' : localStorage.getItem('token'),
            }
        })
        const data = await req.json();
        setUserData((data.data));           
    }


    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token){
            window.location.href = '/VoterLogin'
        }
        else{
            Welcome();
        }
    }, [])


    const ballot = userData.ProfileStatus;
    const status = userData.VoteStatus;
    let verification;
    let result;

    if(ballot == "Verified"){
        verification = <Ballot/>;
    }
    else
    {
        verification = <center><h2>PROFILE UNDER VERIFICATION</h2></center>;
    }

    if(status == "true")
    {
        result = <center><h2>Result will be out soon</h2></center>;
        }
        


    return (
        <div className='dashboard'>
         <div>
             <Nav/>
         </div> 
        <Container>
            <div className="dashContentbox">
                <h2>Voter's Portal</h2>
                <br />
                <div className="dashContent">
                    <p>
                        <b>Unique ID: {userData._id}</b><br />
                        <span className='warning'><i>Don't share Unique ID with anyone</i></span>
                    
                    </p>
                    <p>Voter Name: {userData.First_name} {userData.Last_name}</p>
                    <p>Email: {userData.Email}</p>
                    <p>Profile Status: {userData.ProfileStatus}</p>
                </div>
            </div>
            
        </Container>  
        <hr />
         {verification}

        </div>
    )
}

export default VoterDashboard
