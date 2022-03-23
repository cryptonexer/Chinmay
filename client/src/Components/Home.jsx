import React from 'react'
import './landingpage.css'
import {Container, Row, Col, Button, Card} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const LandingPage = () => {
    return (
        <>
        <div className="landingPage">
           <Container>
               <Row className='pt-3 logo'>
                   <h2>Cryptonex</h2>
                   <h6>Blockchain based Tech</h6>
               </Row>
               <div className="Cards">
               <Row className='row'>
                   <Col md={4} >
                       <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className="mt-4 title"><center>Voters</center></Card.Title>
                            <center>
                            <LinkContainer to="/VoterLogin"><Button variant="primary" className="button1">Login</Button></LinkContainer>
                             <br/>
                             <LinkContainer to="/VoterReg"><Button variant="primary" className="button-2">Register</Button></LinkContainer>
                            
                            </center>
                        </Card.Body>
                        </Card>
                   </Col>
                   <Col md={4}>
                   <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className="mt-4 title"><center>Party/Candidate</center></Card.Title>
                            <center>
                            <LinkContainer to="/partylogin"><Button variant="primary" className="button1">Login</Button></LinkContainer>    
                             <br/>
                             <LinkContainer to="/partyreg"><Button variant="primary" className="button-2">Register</Button></LinkContainer>
                            
                            </center>
                        </Card.Body>
                        </Card>
                   </Col>
                   <Col md={4}>
                   <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className="mt-4 title"><center>Admin</center></Card.Title>
                            <center>
                                <LinkContainer to="/admin"><Button variant="primary" className="button1">Login</Button></LinkContainer>
                             <br/>
                            </center>
                        </Card.Body>
                        </Card>
                   </Col>
               </Row>
               </div>
            </Container> 
        </div>  
        </>
    )
}

export default LandingPage
