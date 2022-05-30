import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Container, Table, Row, Col, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './style.css'
import AdminVoter from './AdminVoter'
import Anime from '../Splash/Animation'

const Admin = () => {

  const [users, setUsers] = useState([]);
  const [dusers, setDusers] = useState([]);
  const [checkStat, setCheckStat] = useState('');
  const [deletion, setDeletion] = useState('');
  const [loading, setLoading] = useState(false);

  const host = `http://13.233.230.168:3002`;

//sending activation to server
  const activated = async (_id) => {
    const response = await axios.put(`${host}/api/activate`, {
      id: _id
    });

    setCheckStat(response.data.status);
    window.location.reload(false);
  }


//sending deactivation to server
  const deactivated = async (_id) => {
    const response = await axios.put(`${host}/api/deactivate`, {
      id: _id,
    });

    setCheckStat(response.data.status);
    window.location.reload(false);
  }


//deleting user
  const remove = async (_id) => {
    const res = await axios.delete(`${host}/api/delete/${_id}`);

    setDeletion(res.data.data);
    window.location.reload(false);
  }

//fetching data to display in table
  useEffect(async () => {
    try {
      //active users
      const res1 = await axios.get(`${host}/api/activeUsers`);
      setUsers(res1.data.data1);

      //inactive users
      const res2 = await axios.get(`${host}/api/deactiveUsers`);
      setDusers(res2.data.data2);
    } catch (error) {
      console.log(error)
    }

    setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 5000)




  }, []);

  let voters;

  const voterData = () => {
    voters = <AdminVoter/>;
  }


  return (
    <div className="user-table">

      {loading ? (<Anime/>) : (
        <>
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark"  variant="dark">
          <Container>
            <Navbar.Brand>Cryptonex</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           
          </Container>
        </Navbar>
      </div>

      <Row>
          <Col md={2}>
                <div className="leftPanel">
                    <Container>
                        <h3>Admin</h3>
                        <div className="menuNavigation">
                            <button>Party</button>
                            <hr />
                            <button onClick={voterData}>Voters</button>
                            <hr />
                            <LinkContainer to="/results">
                                <button>Results</button>
                            </LinkContainer>
                            <hr />
                            <LinkContainer to="/">
                                <button>Logout</button>
                            </LinkContainer>
                            <hr />
                            
                        </div>
                    </Container>
                </div>
          </Col>
          <Col md={10}>
                <div className="rightPanel">
                    <Container>
                      {/* Active Users */}
                      <Row>
                        <h3 className="mt-5">Active Party</h3>
                        <Table striped bordered hover >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Party Name</th>
                              <th>Candidate Name</th>
                              <th>Email</th>
                              <th>Action</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => {
                              return (
                                <tr>
                                  <td>{user._id}</td>
                                  <td>{user.Party_name}</td>
                                  <td>{user.Candidate_name}</td>
                                  <td>{user.Email}</td>
                                  <td><Button className="btn btn-danger" onClick={() => { deactivated(user._id) }}>Deactivate</Button>
                                  </td>
                                  <td><Button className="btn btn-danger" onClick={() => { remove(user._id) }}>Delete</Button></td>
                                </tr>
                              );
                            })
                            }
                          </tbody>
                        </Table>
                      </Row>

                      <Row>
                        {/* Inactive Users */}
                        <h3 className="mt-5">Inactive Party</h3>
                        <Table striped bordered hover >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Party Name</th>
                              <th>Candidate Name</th>
                              <th>Email</th>
                              <th>Action</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dusers.map((duser) => {
                              return (
                                <tr>
                                  <td>{duser._id}</td>
                                  <td>{duser.Party_name}</td>
                                  <td>{duser.Candidate_name}</td>
                                  <td>{duser.Email}</td>
                                  <td><Button className="btn btn-success" onClick={() => { activated(duser._id) }}>Activate</Button>
                                  </td>
                                  <td><Button className="btn btn-danger" onClick={() => { remove(duser._id) }}>Delete</Button></td>
                                </tr>
                              );
                            })
                            }
                          </tbody>
                        </Table>
                      </Row>
                    </Container>
                    <hr />
                    <AdminVoter />
                </div>
          </Col>
      </Row>
      </>

      )}

      {/* Navbar */}
      
      
    </div>
  )
}

export default Admin
