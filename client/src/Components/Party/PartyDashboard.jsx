import React,{useEffect,useState} from 'react'
import Nav from './PartyNav'
import './party.css'

const PartyDashboard = () => {

    const [userData,setUserData] = useState([]);

    const Welcome = async () => {
        const req = await fetch('http://52.66.205.152:3002/api/party/me',{
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
            window.location.href = '/partylogin'
        }
        else{
            Welcome();
        }
    }, [])

    return (
        <>
         <div>
             <Nav/>
         </div>   
         <div className='welcome-main'>
             <div className="welcome">
                <h1>{"Welcome "+userData.Candidate_name}</h1>
                
             </div>
             <p>{userData.Email}</p>
         </div>
        </>
    )
}

export default PartyDashboard
