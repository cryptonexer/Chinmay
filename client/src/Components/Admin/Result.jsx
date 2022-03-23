import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {Table, Container, Row, Col} from 'react-bootstrap'

function Result() {

    const [voterData,setVoterData] = useState([]);
    const [partyData,setpartyData] = useState([]);
    const [party, setPartyName] = useState();

    const getpartyData = async () => {
      const partyResponse = await fetch('http://localhost:3002/party/result');
      setpartyData(await partyResponse.json());
    }

    const getDetails = async (id, name) => {
      setPartyName(name);
      const response = await fetch(`http://localhost:3002/voter/result/${id}`);
     setVoterData(await response.json());
    }

    useEffect(() => {
        getpartyData();
      },[])


  return (
    
    <div>
      <Container>  
      <h3>Result.jsx</h3>
        <Row>
        {partyData.map(party => {
        return(
          
          <Col md={6} key={party._id}>
            <div className="partyBox" >
              <h4>Party Name: {party.Party_name}</h4>
              <h6>Vote Count: {party.Count}</h6>
              <button onClick={() => {
                getDetails(party._id, party.Party_name)
              }}>Get Result</button>
            </div>
          </Col>
          
        )

      })}
        </Row>

        <hr />
        <h4>{party}</h4>
        <ul>
          {voterData.map(voter => {
            return(
              <li key={voter._id}>{voter._id}</li>
            )
          })}
        </ul>


        
      
      </Container>
      

        

        
    </div>
  )
}

export default Result