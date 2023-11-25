import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function MgenSForm() {

    const {session_client} = useParams();
    const {user} = useAuthContext();
    const [errMsg, setErrMsg] = useState("");
    const [clientLink, setClientLink] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const [formBody, setFormBody] = useState("");
    const [currentImage, setCurrentImage] = useState("");
    const [formImage, setFormImage] = useState("");
    const [wsText, setWsText] = useState("");
    const [showfile, setShowFile] = useState("");
    const [resMsg, setResMsg] = useState("");
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const image = process.env.REACT_APP_SERVER + currentImage;
    const link = process.env.REACT_APP_CLIENT + 'mgen/' + session_client;


      useEffect(()=> {
        axios.get(`/api/mgen/get/${session_client}` , {headers: {
          accessToken:user.token
        }}).then((response) => {
          if(response.data){
            setFormTitle(response.data.form_title);
            setFormBody(response.data.form_body);
            setCurrentImage(response.data.form_image)
            setWsText(response.data.whatsapp_text)
            setClientLink(response.data.session_client)
          }
          
        })
      }, [])

      const showFileInput = () =>{
        setShowFile("show")
        }
          

          const submitUpdate = (e) =>{
            e.preventDefault()
            const formData = new FormData()
            formData.append('form_image', formImage)
            formData.append('session_client', clientLink)
            formData.append('form_title', formTitle)
            formData.append('form_body', formBody)
            formData.append('whatsapp_text', wsText)
            axios.put('/api/mgen/form/update', formData, {headers: {
              accessToken:user.token
            },
            onUploadProgress: data =>{
              setProgress(Math.round(100 * (data.loaded/data.total)))
            }  
          }).catch(error => {
              const code = error?.response?.data?.code
              switch(code){
                  case "LIMIT_FILE_SIZE":
                  setErrMsg("Image file size cannot exceed 3MB");
                  break;
                  case "GENERIC_ERROR":
                  setErrMsg("Only .jpg, .jpeg and .png files are allowed");
                  break;
                default:
                  setErrMsg("Something went wrong")
              }
            }).then((response)=> {
              if(response.data.message){
                setErrMsg("");
                setResMsg(response.data.message)
                const nav = () => {
                  navigate('/mgenform')
                }
                setTimeout(nav, 3000)
              }
            })
          
          }

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
  <div className='row justify-content-center my-2'>
    <div className='col-md-8'>
    {resMsg && (<div class="alert alert-success text-center" role="alert">
        {resMsg}
        </div>)}
        {errMsg && (<div class="alert alert-danger text-center" role="alert">
        {errMsg}
        </div>)}
  <div className='card'>
  <div className='row justify-content-center'>
    <div className="col-md-8">
    <form encType='multipart/form-data'>
      <div className='row g-3 my-3 justify-content-center'>
    <h4 className='text-center'>Update Form</h4>
  <div className="col-auto">
    <a href={link}>{link}</a>
  </div>
  </div>
  <div className='container'>
  <div className='row justify-content-center'>
  <div className='col-md-8'>
          <label><strong>Form Title</strong> - Your lead gen form title</label>
          <input type="text" className='form-control shadow-none'  defaultValue={formTitle} onChange={(event) => {setFormTitle(event.target.value)}} required maxLength="254" />
          <label className='mt-5'><strong>Form Body</strong> - Your lead gen form body</label>
          <textarea type="textarea" className='form-control shadow-none' defaultValue={formBody} onChange={(event) => {setFormBody(event.target.value)}} required maxLength="254" />
          <label className='mt-5'><strong>Image</strong> - Your lead gen form image</label><br/>
          <a href='#' onClick={showFileInput}>Change Picture</a>
          {showfile && (<input type="file" className='form-control shadow-none' onChange={(event) => {setFormImage(event.target.files[0])}} required />)}
          {!formImage ? (<img src={image} alt='none'  className='mgen-image-header'/>) : (<img src={URL.createObjectURL(formImage)} alt='Mgen-Header' className='mgen-image-header'/>)}
          {progress >= 1 ? (<div class="progress my-3">
          <div class="progress-bar" role="progressbar" style={{width:`${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
          </div>) : (<></>) }
          <label className='mt'><strong>WhatsApp Text</strong> - Your auto WhatsApp text</label>
          <textarea type="textarea" className='form-control shadow-none' defaultValue={wsText} onChange={(event) => {setWsText(event.target.value)}} required maxLength="254" />
          <div className="d-grid my-3 gap-2">
          <button className='btn btn-primary mt-2' onClick={submitUpdate}>Update Form</button>
          </div>
          
    
  </div>
  </div>
  </div>
</form>
</div>
</div>
    </div>
    </div>
    </div>


    </div>
    </div>
    
  )
}

export default MgenSForm