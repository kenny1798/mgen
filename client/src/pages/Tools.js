import React from 'react';
import '../App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import header1 from '../components/images/tools1.jpg';
import header2 from '../components/images/tools2.jpg';
import header3 from '../components/images/tools3.jpg';
import header4 from '../components/images/tools4.jpg';

function Tools() {



  
  return (
    <div className='App'>
    <div className="container mt-3">
      <div className="row justify-content-center text-center">
        <div className="col-lg-12">
        <h1 className="mt-4 header-title">AUTOMATION TOOLS</h1>
        <p style={{fontSize:"1rem"}}>Check out these amazing automation tools that can turn your sales, marketing and team management easier than ever</p>
        </div>
<div className='row'>
  <div className="col-lg">
  <div className="card text-center my-5">
  <div className="card-header">
    <img src={header1} alt='Mgen-Header' className='image-header'/>
  </div>
  <div className="card-body">
    <h5 className="card-title">M-GEN : Lead Gen Form</h5>
    <p className="card-text">Tired of poor conversions from marketing channels to WhatsApp? Say no more!👇</p>
    <div className="d-grid gap-2 mt-4 mx-auto">
    <Link className='btn btn-primary' to="/mgenform">Learn More</Link>
    </div>
  </div>
  </div>
</div>


<div className="col-lg">
<div className="card text-center my-5">
  <div className="card-header">
  <img src={header2} alt='Mgen-Header' className='image-header'/>
  </div>
  <div className="card-body">
    <h5 className="card-title">M-ACE : Ads Copywriting Express</h5>
    <p className="card-text">15X your ads creation pace with MACE</p>
    <div className="d-grid gap-2 mt-4 mx-auto">
    <Link className='btn btn-primary' to="/mace">Generate Now</Link>
    </div>
  </div>
</div>
</div>
</div>
<div className='row'>
  <div className="col-lg">
  <div className="card text-center my-5">
  <div className="card-header">
    <img src={header4} alt='Mgen-Header' className='image-header'/>
  </div>
  <div className="card-body">
    <h5 className="card-title">M-SMART : DB & Sales Management</h5>
    <p className="card-text">Streamlined customer database and sales team management</p>
    <div className="d-grid gap-2 mt-4 mx-auto">
    <Link className='btn btn-primary' to="/msmart">Manage Here</Link>
    </div>
  </div>
  </div>
</div>

<div className="col-lg">
  <div className="card text-center my-5">
  <div className="card-header">
    <img src={header3} alt='Mgen-Header' className='image-header'/>
  </div>
  <div className="card-body">
    <h5 className="card-title">M-BOT : WhatsApp Bot</h5>
    <p className="card-text">Broadcast. Earn $$$. Sleep. Repeat</p>
    <div className="d-grid gap-2 mt-4 mx-auto">
    <button className='btn btn-secondary'>Coming Soon</button>
    </div>
  </div>
  </div>
</div>

</div>
    </div>
    </div>
    </div>
    
  );
}

export default Tools