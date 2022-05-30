import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {Table, Container, Row, Col} from 'react-bootstrap'
import Navigation from './ResultNav'

import Anime from '../Splash/Animation'

function Result() {

    const [loading, setLoading] = useState(false);
    const [voterData,setVoterData] = useState([]);
    const [partyData,setpartyData] = useState([]);
    const [party, setPartyName] = useState();
    const host = `http://13.233.230.168:3002`;

    const getpartyData = async () => {
      const partyResponse = await fetch(`${host}/party/result`);
      setpartyData(await partyResponse.json());
    }

    const getDetails = async (id, name) => {
      setPartyName(name);
      const response = await fetch(`${host}/voter/result/${id}`);
     setVoterData(await response.json());
    }

    const proof = async(id) => {

      console.log(id);

      const response = await fetch(`${host}/voter/proofOfWork/${id}`);
      console.log(await response.json())

    }

    useEffect(() => {
        getpartyData();

        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 5000)
        
      },[])


  return (
    
    <div>
      {loading ? (<Anime/>):(
        <>
        <Navigation/>
      <Container>  
      <br />
      <h3>Results</h3>
        <Row>
        {partyData.map(party => {
        return(
          
          <Col md={4} key={party._id}>
            <div className="partyBox" >
              <h3>{party.Candidate_name}</h3>
              <h6>{party.Party_name}</h6>
              <h6>Vote Count: {party.Count}</h6>
              <button onClick={() => {
                getDetails(party._id, party.Party_name)
              }}>Get Result</button>
            </div>
          </Col>
          
        )

      })}
        
        <br />
        <br />
        </Row>

        <hr />
        <h4>{party}</h4>
        <ul>
          {voterData.map(voter => {
            return(
              <li key={voter._id}>
                <b>Voter ID: </b> {voter._id} <br />
                <b>Voter Block  : </b> <span onClick={()=>{ proof(voter._id) }}>{voter.Pow}</span> 
              </li>
            )
          })}
        </ul>
      </Container>
        </>
      )}
        
    </div>
  )
}

export default Result