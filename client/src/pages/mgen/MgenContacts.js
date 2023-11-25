import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';

function MgenContacts() {

    const {user} = useAuthContext();
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('/api/mgen/getallcontacts', {headers: {
            accessToken: user.token
        }}).then((response) => {
            setContacts(response.data)
        })
    }, [])

  return (
        <div className='App'>
    <div className="container mt-3">
      <div className="row justify-content-center text-center">
        <div className="col-lg-12">
        <h1 className="mt-4 header-title">M-GEN</h1>
        <p style={{fontSize:"1rem"}}>Increase your conversion rate with our automate WhatsApp message sender on lead form submit!</p>
        </div>
        </div>
        <div className='row justify-content-center text-center mb-2'>
    <div className="col-md-2">
    <div className="d-grid">
  <Link className='btn btn-outline-secondary' to='/mgenform'> ⬅️ Back</Link>
  </div>
  </div>
  </div>
        
  <div className='row justify-content-center text-center'>
    <div className="col-md-8">
    <div className='card'>
    <div class="table-responsive">
        <table className="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Link</th>
      <th scope="col">Name</th>
      <th scope="col">Phone Number</th>
    </tr>
  </thead>
        {contacts.map((value, key) => {
            return (
                <tbody>
  
    <tr>
      <th scope="row">{key+1}</th>
      <td>{value.session}</td>
      <td>{value.leadName}</td>
      <td>{value.leadPhoneNumber}</td>
    </tr>
    
  </tbody>)
            
        })}
        </table>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
    
  )
}

export default MgenContacts
