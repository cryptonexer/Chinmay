import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'

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
                <div className="message">
                    <h2>Authorizing User...</h2>
                </div>
            </Container>
        </div> 
        </>
    )
}

export default Auth
