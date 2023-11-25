import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';

function ManageLeads() {

  const {user} = useAuthContext();
  const [dbData, setDbData] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [deleteDbId, setDeleteDbId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/msmart/leads/all', {headers: {
      accessToken: user.token
    }}).then((response) => {
      const resdata = response.data;
      if(resdata.error){
        setError(resdata.error)
      }else{
        setDbData(resdata)
      }
      
    })
  }, [])

  const handleAlert = (id) => {
    setShowAlert(true);
    setDeleteDbId(id);
  }

  const deleteDB = () => {
    
  }

  const cancelDelete = () => {
    setShowAlert(false);
    setDeleteDbId(0);
  }

  const editSingle = (id) => {
    navigate(`/msmart/db/manage/${id}` );
  }


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
        
        
        <div className='row justify-content-center mt-3'>
          <div className='col-lg-6 text-center'>
            <div className='container'>
            {!error ? (<></>) : (
            <div class="alert alert-danger text-center" role="alert">
              {error}
            </div>)}

        {showAlert === false ? (<></>) : (
        <div class="alert alert-warning" role="alert">
          <p>Are you sure you want to delete this database?</p>
          <button className='btn btn-sm btn-danger' onClick={deleteDB}>DELETE</button> <button className='btn btn-sm btn-secondary' onClick={cancelDelete}>CANCEL</button>
        </div>)}

              <input className='form-control shadow-none my-3' placeholder='search by phone number..' type='text' onChange={(event) =>{setSearch(event.target.value)}} />
                <div className='card'>
                  <div className='table-responsive'>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    {dbData.filter((value) => {
                        return search.toLowerCase() === '' ? value : value.leadPhoneNumber.toLowerCase().includes(search);
                    }).map((value, key) => {

                      

                      return(
                        <tbody>
                      <tr>
                        <th scope="row">{key+1}</th>
                        <td>{value.leadName}</td>
                        <td>{value.leadPhoneNumber}</td>
                        <td>{value.leadStatus}</td>
                        <td><button className='btn btn-sm btn-primary' onClick={() => {editSingle(value.id)}}>Edit</button> <button className='btn btn-sm btn-danger' onClick={() => {handleAlert(value.id)}}>X</button></td>
                      </tr>
                    </tbody>
                      )
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

export default ManageLeads