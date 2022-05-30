import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Row } from 'react-bootstrap'
import './style.css'

const Adminlogin = () => {

    const navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const Postdata = async (e) => {
        e.preventDefault();

        const host = `http://13.233.230.168:3002`;
        const response = await fetch(`${host}/api/adlogin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email,
                Password
            })
        })

        const data = await response.json();
        if (data.Status === 'ok') {
            alert('LoggedIn');
            navigate('/admin');
        }
        else {
            alert('Invalid Credentials');
        }
    }
    return (
        <>
            <div className="adlogin-container">
                <Container>
                    <Row className="offset-md-3">
                    <Form method="POST" className="mt-5 p-4 border shadow">
                        <h2 className="form-title mb-4">
                            <u>Admin Login</u>
                        </h2>

                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="Email" placeholder="Enter email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="Password" name="Password" placeholder="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        <center>
                            <input type="submit" name="signup" id="signup" className="form-submit btn btn-primary mt-3" value="Login" onClick={Postdata} />
                            <br />
                        </center>

                    </Form>
                    </Row>
                    </Container>
            </div>
        </>
    )
}

export default Adminlogin
