import React,{useState} from 'react'
import { Container, Form, Row } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'
import './Voter.css'

const Voterlogin = () => {
    const navigate = useNavigate();

    const [Email,setEmail] = useState('');
    const [Password,setPassword] = useState('');

    const Postdata = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3002/api/voter/login',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                Email,
                Password
            })
        })

        const data = await response.json();
        if(data.Status === 'ok'){
            localStorage.setItem('token', data.data.token);
            navigate('/Voter/auth');
        }
        else{
            alert('Invalid Credentials');
        }
    }

    return (
        <>
        
        <div className="formpage">
            <div className="formBox">
                <center><h3>Voter's Login</h3><hr /></center>
                <form method="post">
                    <input type="email" placeholder='Email' value={Email}
                        onChange={(e) => setEmail(e.target.value)} required/><br />
                    <input type="password" placeholder='Password' value={Password}
                        onChange={(e) => setPassword(e.target.value)} required/><br />
                    <button type="submit" name="signup" id="signup" value="Login" onClick={Postdata}>Submit</button>
                </form>
                <center><a href="/VoterReg">Create Account</a><br />
                <a href="/">HOME</a></center>
            </div>
        </div>

    </>
    )
}

export default Voterlogin
