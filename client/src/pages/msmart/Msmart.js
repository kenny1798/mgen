import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

function Msmart() {

  const {user} = useAuthContext();
  const [err, setErr] = useState("");
  const [totalDB, setTotalDB] = useState("");
  const [totalFU, setTotalFU] = useState("");
  const [recentUpload, setRecentUpload] = useState("");
  const [recentEngaged, setRecentEngaged] = useState("");


  useEffect(() => {
    axios.get('/api/msmart/stat', {headers:{
      accessToken:user.token
    }}).then((response) => {
      const resdata = response.data;
      if(resdata.error){
        setErr(resdata.error)
      }else{
        setTotalDB(resdata.totalLeads)
        setTotalFU(resdata.followUpLeads)
        setRecentUpload(resdata.latestUpload)
        setRecentEngaged(resdata.latestEngaged)
      }
    })
  })


  return (
    <div className='App'>
    <div className="container mt-3">
      <div className="row justify-content-center text-center">
        <div className="col-lg-12">
        <h1 className="mt-4 header-title">M-SMART</h1>
        <p style={{fontSize:"1rem"}}>No more 1000 files on your desk and desktop. Say hello to M-Smart 😎</p>
        </div>
        </div>
        </div>

<div className='row mt-3'>
<div className='d-flex justify-content-evenly' style={{backgroundColor:"rgba(0, 162, 255, 0.24)"}}>
<div className='container mx-4'>
<div className='row justify-content-center'>
<div className='text-center' style={{fontSize:"5rem"}}>
👥
    </div>
    <div className='stat-header text-center'>
      TEAM SUMMARY
    </div>
    </div>  
  <div className='row mb-4'>
  <div className="col-lg my-4">
  <div className="stat-card text-center">
    <div className='card-stat-headtext mx-3'>TOTAL TEAM COUNT</div>
    <div className='stat-data'>12</div>
  </div>
</div>

<div className="col-lg my-4">
  <div className="stat-card text-center">
    <div className='card-stat-headtext mx-3'>TOTAL TEAM MEMBERS</div>
    <div className='stat-data'>322</div>
  </div>
</div>

</div>
<div className="d-grid mt-3 mb-5 mx-auto">
    <Link className='btn btn-lg btn-dark mb-5' to="#">Manage Team ➡️</Link>
    </div>
</div>
</div>
</div>

<div className='row'>
<div className='d-flex justify-content-evenly mb-5' style={{backgroundColor:"rgba(255, 238, 0, 0.24)"}}>
<div className='container mx-4'>
<div className='row'>
<div className='text-center mt-5' style={{fontSize:"5rem"}}>
📱
    </div>
    <div className='stat-header text-center mt-3' style={{color:"#de9102"}}>
      DATABASE SUMMARY
    </div>
    </div>  
  <div className='row'>
  <div className="col-lg my-4">
  <div className="stat-card text-center">
    <div className='card-stat-headtext mx-3'>TOTAL UPLOADED DATABASE</div>
    <div className='stat-data'>{totalDB}</div>
  </div>
</div>

<div className="col-lg my-4">
  <div className="stat-card text-center">
    <div className='card-stat-headtext mx-3'>TODAY'S FOLLOW UP COUNT</div>
    <div className='stat-data'>{totalFU}</div>
  </div>
</div>
</div>

<div className='row mb-3'>
<div className="col-lg my-4">
  <div className="stat-card text-center">
    <div className='card-stat-headtext mx-3'>RECENT DATABASE UPLOADED</div>
    <div className='stat-data'>{recentUpload}</div>
  </div>
</div>

<div className="col-lg my-4">
  <div className="stat-card text-center">
    <div className='card-stat-headtext mx-3'>RECENT ENGAGED DATABASE</div>
    <div className='stat-data'>{recentEngaged}</div>
  </div>
</div>

</div>

<div className="d-grid mt-3 mb-5 mx-auto">
    <Link className='btn btn-lg btn-dark mb-3' to="/msmart/db/manage">Manage Database ➡️</Link>
    </div>

</div>

</div>
</div>
</div>

        
  )
}

export default Msmart