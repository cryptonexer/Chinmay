import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Container, Table, Row} from 'react-bootstrap'
import './style.css'


function AdminVoter() {

  const [voters, setVoters] = useState([]);
  const [nvVoters, setnvVoters] = useState([]);
  const [checkStat, setCheckStat] = useState('');

  const Verify = async (_id) => {
      const response = await axios.put(`http://52.66.205.174:3002/api/Voter/verify`, {
        id: _id
      });
  
      setCheckStat(response.data.status);
      window.location.reload(false);
    }
  
  
  //sending deactivation to server
    const NotVerify = async (_id) => {
      const response = await axios.put(`http://52.66.205.174:3002/api/Voter/decline`, {
        id: _id
      });
  
      setCheckStat(response.data.status);
      window.location.reload(false)
    }
  
  
  
  
  //fetching data to display in table
    useEffect(async () => {
      try {
        //Verified Voter
        const res1 = await axios.get('http://52.66.205.174:3002/api/activeVoters');
        setVoters(res1.data.data1);
  
        //Not Verified Voters
        const res2 = await axios.get('http://52.66.205.174:3002/api/deactiveVoters');
        setnvVoters(res2.data.data2);
      } catch (error) {
        console.log(error)
      }
    }, []);

return (
      <div>
            
            <Container>
            <h2>Voters</h2>
        {/* Verified Voters */}
        <Row>
          <h3 className="mt-5">Verified Voter</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((voterlist) => {
                return (
                  <tr>
                    <td>{voterlist._id}</td>
                    <td>{voterlist.First_name}</td>
                    <td>{voterlist.Last_name}</td>
                    <td>{voterlist.Email}</td>
                    <td><Button className="btn btn-danger" onClick={() => { NotVerify(voterlist._id) }}>Deny Allowance</Button>
                    </td>
                  </tr>
                );
              })
              }
            </tbody>
          </Table>
        </Row>

        <Row>
          {/* Not Vrified Voters */}
          <h3 className="mt-5">Not Verified Voter</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {nvVoters.map((nvvoter) => {
                return (
                  <tr>
                    <td>{nvvoter._id}</td>
                    <td>{nvvoter.First_name}</td>
                    <td>{nvvoter.Last_name}</td>
                    <td>{nvvoter.Email}</td>
                    <td><Button className="btn btn-success" onClick={() => { Verify(nvvoter._id) }}>Activate</Button>
                    </td>
                  </tr>
                );
              })
              }
            </tbody>
          </Table>
        </Row>
      </Container>
            
      </div>
)
}

export default AdminVoter
