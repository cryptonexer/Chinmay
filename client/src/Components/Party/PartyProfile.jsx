import React, { useEffect, useState } from 'react'
import Nav from './PartyNav'
import { Col, Container, Form, Row } from 'react-bootstrap'
import './party.css'

const PartyProfile = () => {

    const [userData, setUserData] = useState([]);

    const partydetails = async () => {
        const req = await fetch('http://52.66.205.174:3002/api/party/me', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })

        const data = await req.json();
        setUserData((data.data));
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('Invalid User');
            window.location.href = '/Party/partylogin'
        }
        else {
            partydetails();
        }
    }, [])

    return (
        <>
            <div className="main">
                <div>
                    <Nav />
                </div>
                <Container>
                    {/* <Form method="get" className="mt-4 border shadow"> */}
                    <div className="details mt-4 border shadow">
                        <Row className="p-3">
                            <h3 className="mb-4"><u>Profile</u></h3>
                            <Col md={6} className="image">
                                <img src={`/partysymbol/${userData.Image}`} alt="Image" />
                            </Col>
                            <Col md={6}>
                                <Row>
                                    <Col className="profile">
                                        <h4>{userData.Candidate_name}</h4>
                                    </Col>
                                    <Row className="mt-5">
                                        <span>Email : {userData.Email}</span>
                                        <span>Slogan : {userData.Slogan}</span>
                                        <span>Description : {userData.Description}</span>
                                    </Row>
                                </Row>
                            </Col>
                        </Row>
                        </div>
                    {/* </Form> */}
                </Container>
            </div>
        </>
    )
}

export default PartyProfile
