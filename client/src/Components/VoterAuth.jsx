import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Splash from './Splash/Animation'
const Auth = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token){
            window.alert('Invalid User Please Register');
        }
        else{
            window.location.href = '/VoterDashboard'
        }
    }, [])

    return (
        <>
        <div className="Auth_container">
            <Container>
                <div className="message" style={{position:   "absolute", top:"50%", left:"50%"}}>
                    <h4>Connecting To Block...</h4>
                </div>
            </Container>
        </div> 
        </>
    )
}

export default Auth
