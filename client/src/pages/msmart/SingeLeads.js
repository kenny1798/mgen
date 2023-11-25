import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';

function SingeLeads() {

    const {user} = useAuthContext();
    const [error, setError] = useState("");
    const {id} = useParams();
    const [dbData, setDbData] = useState({});

    useEffect(() => {
      axios.get(`/api/msmart/lead/${id}`, {headers: {
        accessToken: user.token
      }}).then((response) => {
        const resdata = response.data;
        if(resdata.error){
          setError(resdata.error)
        }else{
          setDbData(resdata.db)
        }
      })

    }, [])

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
        <div className='col-lg-12'>
          <div className='container'>
            <div className='card'>
              <div className='card-body'>

            <div className='row justify-content-center' >
              <div className='stat-header text-center'>INFO AND PROGRESS</div>
              <div className='col-lg-4 mt-4'>
                <label>Name</label>
                <input type="text" className='form-control shadow-none' required maxLength="254" />
              </div>
              <div className='col-lg-4 mt-4'>
                <label>Phone Number</label>
                <input type="text" className='form-control shadow-none' required maxLength="254" />
              </div>
              <div className='col-lg-4 mt-4'>
                <label>Database Source</label>
                <input type="text" className='form-control shadow-none' required maxLength="254" />
              </div>
            </div>

            <div className='row justify-content-center mt-4'>
              <div className='col-lg-4 mt-4'>
                <label>Status</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className='col-sm-1 mt-2'></div>
              <div className='col-lg-4 mt-4'>
                <label>Status Remark</label>
                <textarea type="text" className='form-control shadow-none' required maxLength="1000" rows='3'/>
              </div>
            </div>

            <div className='row justify-content-center mt-4'>
              <div className='col-lg-4 mt-4'>
                <label>Present Status</label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className='col-sm-1 mt-2'></div>
              <div className='col-lg-4 mt-4'>
                <label>Present Remark</label>
                <textarea type="text" className='form-control shadow-none' required maxLength="1000" rows='3'/>
              </div>
            </div>

            <div className='row justify-content-center mt-4'>
              <div className='col-lg-4 mt-4'>
                <label>Follow Up Date</label>
                <input type="datetime-local" className='form-control shadow-none' required maxLength="254" />
              </div>
              <div className='col-sm-1 mt-2'></div>
              <div className='col-lg-4 mt-4'>
                <label>Rejection</label>
                <textarea type="text" className='form-control shadow-none' required maxLength="254" rows='3' />
              </div>
              </div>

            <div className="row justify-content-center text-center mt-4">
            <div className='col-lg-4 mt-4'>
            <div className="d-grid my-3 gap-2">
              <button className='btn btn-primary mt-2'>Update Database</button>
              <button className='btn btn-outline-secondary mt-2'>Back</button>
              </div>
              </div>
            </div>
            
            </div>
            </div>
          </div>
        </div>

      </div>
        
        
        
        </div>
  )
}

export default SingeLeads