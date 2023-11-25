import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import logo from '../../components/logo.png'
import env from 'react-dotenv';


function Mgenform({setNavbar, props}) {

 

  //useState
  const {session_client} = useParams();
  const [formObject, setFormObject] = useState({});
  const image = process.env.REACT_APP_SERVER + formObject.form_image;
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState({});

  document.title = formObject.form_title

  //functions
  const formSubmit = (event) =>{
    event.preventDefault()
    const data = {leadName: name, leadPhoneNumber: phoneNumber};
     axios.post(`/api/mgen/send-message/${session_client}`, data).then( async (response) =>{
      const json = await response.data;
      if(json.error){
        setErrMsg(json.error)
      }else{
        setMessage(json.msg)
        setStatus('success')
      } 
    })

  }

    useEffect(() => {
        setNavbar(false);
    }, [])

    useEffect(() => {
      axios.get(`/api/mgen/get-data/${session_client}`).then((response) => {
        setFormObject(response.data.session);
        setUser(response.data.user);
      })

    }, [])

  return (
  
  <div>
    {user.contacts >= user.allowedContacts ? (
      <div className="container">
      <div className="row text-center">
        <div className="col-lg-12 justify-content-center">
        <h1 className="mt-4 mgen-header-title text-danger">Form Currently Unavailable</h1>
        </div>
        </div>
        </div>
    ) : (
      <div className="container">
      <div className="row text-center">
        <div className="col-lg-12 justify-content-center">
        <h1 className="mt-4 mgen-header-title">{formObject.form_title}</h1>
        </div>
        </div>
<div className='row justify-content-center'>
<div className="col-md-6 mb-5">
<img src={image} alt='Mgen-Header' className='mgen-image-header'/>

<div className="card">
  <div className="card-body">
    <p style={{whiteSpace: 'pre-wrap'}} className="card-text text-center">{formObject.form_body}</p>
  </div>
  {!errMsg ? (<></>) : (<div className='container'><div class="alert alert-danger" role="alert">
  {errMsg}
</div></div>)}
{status === '' ? (
<div className="card-body">
    <form>
    <label>Name</label>
    <input type="text" className='form-control shadow-none' name="name" onChange={(event) => {setName(event.target.value)}} required maxLength="254" />
    <label className='mt-3'>WhatsApp Number</label>
    <input type="text" className='form-control shadow-none' name='phonenumber' onChange={(event) => {setPhoneNumber(event.target.value)}} required maxLength="254" />
    <div className="d-grid gap-2 mt-4 mx-auto">
      <button className='btn btn-success' onClick={formSubmit}>Submit Details</button>
    </div>
    </form>
  </div>) : (
    <div className="card-body">
<div className='container'><div class="alert alert-success" role="alert">
  {message}
</div></div>
  </div>
  )}
  
  <p className='text-end mt-4 mx-4'><small>Powered by:</small> <a href='#'><img src={logo} width='80' /></a></p>
</div>
</div>
    </div>
    </div>
    )}
    
    </div>
        )
}

export default Mgenform