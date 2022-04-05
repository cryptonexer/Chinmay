import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Container, Table, Row, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './style.css'
import AdminVoter from './AdminVoter'

const Admin = () => {

  const [users, setUsers] = useState([]);
  const [dusers, setDusers] = useState([]);
  const [checkStat, setCheckStat] = useState('');
  const [deletion, setDeletion] = useState('');

  const host = `http://13.127.250.210:3002`;

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
  }, []);

  return (
    <div className="user-table">

      {/* Navbar */}
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/adminlogin">
                  <Nav.Link className="text-danger">Logout</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/">
                        <button>Home</button>
                    </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>


      {/* main-data */}
      <Container>
        {/* Active Users */}
        <Row>
          <h3 className="mt-5">Active Party</h3>
          <Table striped bordered hover variant="dark">
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
          <Table striped bordered hover variant="dark">
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
      <AdminVoter/>
      
    </div>
  )
}

export default Admin
