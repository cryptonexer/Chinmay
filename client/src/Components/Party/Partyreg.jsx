import React, { useState } from 'react'
import { Form, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import './party.css'
import axios from 'axios'

const Partyreg = () => {

    const navigate = useNavigate();

    const [Party_name, setParty_name] = useState('');
    const [Candidate_name, setCandidate_name] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Slogan, setSlogan] = useState('');
    const [Description, setDescription] = useState('');
    const [Password, setPassword] = useState('');
    const [Cpassword, setCpassword] = useState('');
    const [File, setFile] = useState('');

    const Postdata = async (e) => {
        e.preventDefault();

        const form_data = new FormData();
        form_data.append('Party_name', Party_name);
        form_data.append('Candidate_name', Candidate_name);
        form_data.append('Email', Email);
        form_data.append('Phone', Phone);
        form_data.append('Slogan', Slogan);
        form_data.append('Description', Description);
        form_data.append('Password', Password);
        form_data.append('Cpassword', Cpassword);
        form_data.append('File', File);
        
        const response = await axios.post('/api/party/register', form_data)

        if (response.data.Status === 'Please Enter Same Password') {
            alert('Please Enter Same Password');
        }
        else if (response.data.Status === 'error') {
            alert('Email already in use');
        }
        else {
            if (response.data.Status === 'Please Enter all details' || !response.data) {

                alert('Invalid registeration');
            }
            else {
                alert('Registered Successfully');
                navigate('/partylogin');
            }
        }
    }
    

    return (
        <>
            <div className="signup-container">
                <Container>
                    <Form method="POST" className=" border shadow-lg  mt-5 p-4" encType='multipart/form-data'>
                        <h2 className="form-title mb-4">
                            <u>Party Register</u>
                        </h2>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Party Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control type="text" name="Party_name" placeholder="Party Name"
                                        value={Party_name}
                                        onChange={(e) => setParty_name(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Candidate Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control type="text" name="Candidate_name" placeholder="Enter Full Name"
                                        value={Candidate_name}
                                        onChange={(e) => setCandidate_name(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2" controlId="formBasicEmail">
                                    <Form.Label>Email address <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="email" name="Email" placeholder="Enter email"
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                                </Col>
                                
                                <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Phone <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control type="tel" maxLength="10" name="Phone" placeholder="Phone Number"
                                        value={Phone}
                                        onChange={(e) => setPhone(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Slogan <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control type="text" name="Slogan" placeholder="Slogan"
                                        value={Slogan}
                                        onChange={(e) => setSlogan(e.target.value)} required />
                                </Form.Group>
                        
                                <Form.Group className="mb-2">
                                    <Form.Label>Description <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control type="textarea" name="Description" placeholder="Description"
                                        value={Description}
                                        onChange={(e) => setDescription(e.target.value)} required />
                                </Form.Group>
                                </Col>

                                <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Party Symbol<span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="file" name="File" accept=".png, .jpg, .jpeg"
                                        onChange={(e) => setFile(e.target.files[0])} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="Password" name="Password" placeholder="password"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
                                    <Form.Control type="Password" name="Cpassword" placeholder=" Same password"
                                        value={Cpassword}
                                        onChange={(e) => setCpassword(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <center>
                            <input type="submit" name="signup" id="signup" className="form-submit   btn btn-primary mt-4" value="Register" onClick={Postdata} />
                            <br /> <br />
                            <LinkContainer to="/partylogin">
                                <a className="loginroute">Login if Already registered</a>
                            </LinkContainer>
                        </center>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default Partyreg
