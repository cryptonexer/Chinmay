import React, {useState} from 'react'
import {Form,Row,Col, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Voter.css'

const Voterreg = () => {

    const navigate = useNavigate();

    const [First_name,setFirst_name] = useState('');
    const [Last_name,setLast_name] = useState('');
    const [Phone,setPhone] = useState('');
    const [Email,setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Taluka, setTaluka] = useState('');
    const [City, setCity] = useState('');
    const [Pincode, setPincode] = useState('');
    const [Aadhar, setAadhar] = useState('');
    const [VoterID, setVoterID] = useState('');
    const [Password,setPassword] = useState('');
    const [Cpassword,setCpassword] = useState('');

    const Postdata = async (e) => {
        e.preventDefault();

        const response = await fetch('http://52.66.205.174:3002/api/voter/register',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                First_name,
                Last_name,
                Phone,
                Email,
                Address,
                Taluka,
                City,
                Pincode,
                Aadhar,
                VoterID,
                Password,
                Cpassword
            })
        })

        const data = await response.json();

        if(data.Status === 'Please Enter Same Password'){
            alert('Please Enter Same Password');
        }
        else if(data.Status === 'error'){
            alert('Email already in use');
        }
        else{
        if(data.Status === 'Please Enter all details' || !data){
            
            alert('Invalid registeration');
        }
        else{
             alert('Registered Successfully');
             navigate('/Voterlogin');
        }
    }
    }
    
    return (
        <>
        <div className="signup-container">
            <Container>
                <Form method="POST" className=" border shadow mt-3 p-4">
                    <h2 className="form-title mb-4">
                        <u>Voter Register</u>
                    </h2>
                <Row>
                    <Col md={6}>
                    <Form.Group className="mb-2">
                        <Form.Label>First Name
                        </Form.Label>
                        <Form.Control type="text"  name="Cpassword" placeholder="First Name" 
                            value={First_name}
                            onChange={(e) => setFirst_name(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Last Name
                        </Form.Label>
                        <Form.Control type="text"  name="Last_name" placeholder="Last Name" 
                            value={Last_name}
                            onChange={(e) => setLast_name(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Phone Number
                        </Form.Label>
                        <Form.Control type="number"  name="Phone" placeholder="Phone Number" 
                            value={Phone} 
                            onChange={(e) => setPhone(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="Email" placeholder="Enter email"  
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)} required/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={3} name='Address' placeholder='Addresss' 
                           value={Address}
                           onChange={(e) => setAddress(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Taluka
                        </Form.Label>
                        <Form.Control type="text"  name="Taluka" placeholder="Taluka" 
                            value={Taluka}
                            onChange={(e) => setTaluka(e.target.value)} required/>
                    </Form.Group>
                    </Col>

                    <Col md={6}>
                    

                    <Form.Group className="mb-2">
                        <Form.Label>City
                        </Form.Label>
                        <Form.Control type="text"  name="City" placeholder="City" 
                            value={City}
                            onChange={(e) => setCity(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Pincode
                        </Form.Label>
                        <Form.Control type="number"  name="Pincode" placeholder="Pincode" 
                            value={Pincode} 
                            onChange={(e) => setPincode(e.target.value)} required/>
                    </Form.Group>    


                    <Form.Group className="mb-2">
                        <Form.Label>Aadhar Number
                        </Form.Label>
                        <Form.Control type="number"  name="Aadhar" placeholder="Aadhar Number" 
                            value={Aadhar} 
                            onChange={(e) => setAadhar(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Voter ID
                        </Form.Label>
                        <Form.Control type="number"  name="VoterID" placeholder="Voter ID" 
                            value={VoterID} 
                            onChange={(e) => setVoterID(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="Password" name="Password" placeholder="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)} required/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="Password" name="Cpassword" placeholder="password"
                            value={Cpassword}
                            onChange={(e) => setCpassword(e.target.value)} required/>
                    </Form.Group>
                    </Col>
                </Row>

                    <center>
                        <button type="submit" name="signup" id="signup" className="form-submit   btn btn-primary mt-3" value="Register" onClick={Postdata}>Register</button>
                        <br/>
                        <LinkContainer to="/VoterLogin">
                            <a className="loginroute">Login if Already registered</a>
                        </LinkContainer><br></br>
                        <LinkContainer to="/">
                        <button>Home</button>
                    </LinkContainer>
                    </center>
                </Form>
                </Container>
            </div>
        </>
    )
}

export default Voterreg
