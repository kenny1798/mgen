import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';


function Mgen() {

  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [session, setSession] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [contact, setContact] = useState([]);
  const [waStatus, setWaStatus] = useState();
  const [waButton, setWaButton] = useState(true);
  const [reconButton, setReconButton] = useState(false);

  const reconWhatsApp = () => {
    axios.get('/api/user/wsauth/delete', {headers: {
      accessToken:user.token
    }}).then((response) => {
      if(response.data.message){
        navigate('/whatsapp/auth')
      }
    })
  }
  

useEffect(()=> {
  axios.get('/api/user/wsauth/check', {headers: {
    accessToken:user.token
  }}).then((response) => {
    const json = response.data.status
    if(json === 'connected'){
      setWaStatus("WhatsApp connected 🟢")
      setReconButton(true)
    }else if(json === 'disconnect'){
      setWaStatus("WhatsApp not connected 🔴")
      setWaButton(false)
    }
  }).then(() => {
    axios.get('/api/mgen/getSession', {headers: {
      accessToken:user.token
    }}).then((response) => {
      setSession(response.data);
    }).then(() => {
      axios.get('/api/mgen/getleads', {headers: {
        accessToken: user.token
      }}).then((response) => {
        setContact(response.data.contacts)
      })
    })
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
        <div className='row justify-content-center'>
        <div className="col-md-8">
    <div className="card mb-5">
    <div className="card-header  text-center">
      <p><strong>WhatsApp Status:</strong> {waStatus}</p>
      {waButton === false ? (<Link className='btn btn-sm btn-success' to="/whatsapp/auth">Connect WhatsApp Now</Link>) : (<></>)}
      {reconButton === true ? (<button className='btn btn-sm btn-danger' onClick={reconWhatsApp}>Reconnect whatsApp</button>) : (<></>)}
      </div>
      </div>
      </div>
      </div>


<div className='row justify-content-center'>


    <div className="col-md-8">
    <div className="card mb-5">
    <div className="card-header  text-center">
      <p className=''>Total Contacts : <strong>{contact}</strong></p>
      <Link className='btn btn-sm btn-dark mx-2' to='/mgenform/contacts'>My Contacts</Link>
      <Link className='btn btn-sm btn-success' to='/mgenform/createform'>+ New Form</Link>
    </div>
    <div class="table-responsive">
        <table class="table table-hover text-center">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Link</th>
      <th scope="col"></th>
    </tr>
  </thead>
    {session.map((value, key) =>{

  const link = '/mgenform/form/' + value.session_client;
  const sessionlink = `${process.env.REACT_APP_CLIENT}mgen/${value.session_client}`

      return (
  <tbody>
  
    <tr>
      <th scope="row">{key+1}</th>
      <td>{value.form_title}</td>
      <td><a href={sessionlink}>{sessionlink}</a></td> 
      <td><Link className='btn btn-sm btn-primary' to={link}>Edit</Link></td>
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

  
    
        </div>

  )
}

export default Mgen