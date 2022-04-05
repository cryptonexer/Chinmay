import React, { useEffect, useState } from 'react'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const Votingballot = () => {

    const [users, setUsers] = useState([]);
    const [votinguser, setvotingUser] = useState('');

    const host = `http://13.127.250.210:3002`;
    //fetching voters voteStatus using generated token
    const votestatus = async () => {
        const req = await fetch(`${host}/api/voter/me`, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })

        const data = await req.json();
        setvotingUser(data.data);
    }


    //fetching all details related to active party members
    useEffect(async () => {
        try {
            const res = await axios.get(`${host}/api/activeUsers`);
            setUsers(res.data.data1);
        } catch (error) {
            console.log(error)
        }

        //checking generated token
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/VoterLogin'
        }
        else {
            votestatus();
        }
   }, [])

    //changing voters votestatus
    /*async function changeVoteStatus(_id) {
        try {
            await axios.put(`http://13.127.250.210:3002http://13.127.250.210:3002/api/voter/votestat/${_id}`);
        } catch (error) {
            if (error) throw error
        }
    }*/

    //passing id's to create a transaction
    function voteTransc(id1, id2){
        try {
            axios.get(`${host}/api/voter/votertrans/${id1}/${id2}`)
        } catch (error) {
            if(error) throw error
        }
    }

    //passing party members id for incrementing vote count
    function voting(_id) {
        try {        
             axios.get(`${host}/voteballot/vote/${_id}`);
        }
        catch (err) {
            if (err) throw err;
        }
        window.location.reload(false);
    }

    const voterVoteStat = votinguser.VoteStatus;

    return (
        <>
            <div className="voting-ballot">
                <Container>
                    <Row>
                        {users.map((user) => {
                            return (
                                <Col md={4} key={user._id}>
                                    <Card style={{ width: '18rem' }}  className="mb-3 shadow-lg border card">
                                        <Card.Img variant="top" className="image" src={`${host}/partysymbol/${user.Image}`} />
                                        <Card.Body>
                                            <Card.Title>{user.Candidate_name}</Card.Title>
                                            <Card.Title>{user.Party_name}</Card.Title>
                                            <Card.Text>
                                                {user.Slogan}
                                            </Card.Text>
                                            <Card.Text>
                                                {user.Description}
                                            </Card.Text>
                                            {voterVoteStat === "true" ? <Button variant="success" disabled>Vote Casted</Button> : <Button variant="primary" 
                                            onClick={() => { 
                                                voting(user._id); 
                                                /*changeVoteStatus(votinguser._id);*/
                                                voteTransc(votinguser._id, user._id);}
                                                }>Cast Vote</Button>}
                                                
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                        }
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Votingballot
