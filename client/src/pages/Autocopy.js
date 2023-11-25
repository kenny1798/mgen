import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useAuthContext } from '../hooks/useAuthContext';

function Autocopy() {

const {user} = useAuthContext();
const [errMsg, setErrMsg] = useState("");
const [showGenerated, setShowGenerated] = useState("");

const [testimoni, setTestimoni] = useState("");
const [takut, setTakut] = useState("");
const [fakta, setFakta] = useState("");
const [result, setResult] = useState("");
const [puncaAkibat, setPuncaAkibat] = useState("");
const [soalan, setSoalan] = useState("");
const [tidak, setTidak] = useState("");
const [susah, setSusah] = useState("");
const [solusi, setSolusi] = useState("");
const [hasil, setHasil] = useState("");
const [offera, setOffera] = useState("");
const [offerb, setOfferb] = useState("");
const [offerc, setOfferc] = useState("");
const grandOffer = offera + '' + offerb + offerc;
const [cta, setCta] = useState("");
const [cwform, setCwForm] = useState("show");

const generateCW = (event) => {
  event.preventDefault();

  setShowGenerated("show");
  setCwForm(''); 
    
  }
  return (
  <div>
<div className='App'>
    <div className="container mt-3">
      <div className="row justify-content-center text-center">
        <div className="col-lg-8">
        <h1 className="mt-4 header-title">M-ACE</h1>
        <p style={{fontSize:"1rem"}}> Generate copywritings anytime, anywhere with these EZ step-by-step Ads Copywriting Express</p>
        <p className='text-danger' style={{fontSize:"1rem"}}><strong>WARNING! :</strong> Generated copywritings will not be stored in our database</p>
        </div>
        </div>
<div className='row justify-content-center'>
<div className="col-md-8">
{cwform && (
  <div>
    <form>
    <div className="card mb-5">
      <div className="card-header">
    <h5 className="card-title">Step 1: HEADERS</h5>
    </div>
    <div className="card-body">
    <label className='mt'>Testimonial</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setTestimoni(event.target.value)}} required />
    <label className='mt-4'>Fear</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setTakut(event.target.value)}} required />
    <label className='mt-4'>Facts</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setFakta(event.target.value)}} required />
    <label className='mt-4'>Results</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setResult(event.target.value)}} required />
    <label className='mt-4'>Cause & Effect</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setPuncaAkibat(event.target.value)}} required />
    </div>
    </div>
  
    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Step 2: PROBLEM</h5>
    </div>
    <div className="card-body">
    <label className='mt'>Question</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setSoalan(event.target.value)}} required />
    <label className='mt-4'>No</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setTidak(event.target.value)}} required />
    <label className='mt-4'>Uneasy</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setSusah(event.target.value)}} required />
    </div>
    </div>
 
    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Step 3: SOLUTION</h5>
    </div>
    <div className="card-body">
    <label className='mt'>The Great Solution</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setSolusi(event.target.value)}} required />
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Step 4: RESULT</h5>
    </div>
    <div className="card-body">
    <label className='mt'>Results</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setHasil(event.target.value)}} required />
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Step 5: OFFERS</h5>
    </div>
    <div className="card-body">
    <label className='mt'>Problem Solver</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setOffera(event.target.value)}} required />
    <label className='mt-4'>Worthiness</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setOfferb(event.target.value)}} required />
    <label className='mt-4'>Trust & Confidence</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setOfferc(event.target.value)}} required />
    <label className='mt-4'><strong>Grand Offer:</strong></label>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Step 6: CALL TO ACTION</h5>
    </div>
    <div className="card-body">
    <label className='mt'>CTA</label>
    <textarea type="text" className='form-control shadow-none' onChange={(event) => {setCta(event.target.value)}} required />
      <div className="d-grid my-3 gap-2">
      <button className='btn btn-success mt-3 mx-4' onClick={generateCW}>Generate Now</button>
      <button className='btn btn-outline-danger mt-3 mx-4' type='reset'>Reset Form</button>
      </div>
    </div>
    </div>
    </form>
    </div>
  )}
  {showGenerated && (
    <div>
    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 1</h5>
    </div>
    <div className="card-body">
    <p>{testimoni}</p>
    <p>{soalan}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 2</h5>
    </div>
    <div className="card-body">
    <p>{testimoni}</p>
    <p>{tidak}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 3</h5>
    </div>
    <div className="card-body">
    <p>{testimoni}</p>
    <p>{susah}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 4</h5>
    </div>
    <div className="card-body">
    <p>{takut}</p>
    <p>{soalan}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 5</h5>
    </div>
    <div className="card-body">
    <p>{takut}</p>
    <p>{tidak}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 6</h5>
    </div>
    <div className="card-body">
    <p>{takut}</p>
    <p>{susah}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 7</h5>
    </div>
    <div className="card-body">
    <p>{fakta}</p>
    <p>{soalan}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 8</h5>
    </div>
    <div className="card-body">
    <p>{fakta}</p>
    <p>{tidak}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 9</h5>
    </div>
    <div className="card-body">
    <p>{fakta}</p>
    <p>{susah}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 10</h5>
    </div>
    <div className="card-body">
    <p>{result}</p>
    <p>{soalan}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 11</h5>
    </div>
    <div className="card-body">
    <p>{result}</p>
    <p>{tidak}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 12</h5>
    </div>
    <div className="card-body">
    <p>{result}</p>
    <p>{susah}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 13</h5>
    </div>
    <div className="card-body">
    <p>{puncaAkibat}</p>
    <p>{soalan}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 14</h5>
    </div>
    <div className="card-body">
    <p>{puncaAkibat}</p>
    <p>{tidak}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    <div className="card my-5">
      <div className="card-header">
    <h5 className="card-title">Copywriting 15</h5>
    </div>
    <div className="card-body">
    <p>{puncaAkibat}</p>
    <p>{susah}</p>
    <p>{solusi}</p>
    <p>{hasil}</p>
    <p>{offera}</p>
    <p>{offerb}</p>
    <p>{offerc}</p>
    <p>{cta}</p>
    </div>
    </div>

    </div>
  )}
</div>
</div>
    </div>
        </div>

    
        </div>
  )
}

export default Autocopy