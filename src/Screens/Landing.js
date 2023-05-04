import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config';
import Navbar from '../Components/Navbar';
import "./Landing.css";
import OptionBox from './OptionBox';

import {  useHistory } from 'react-router-dom/cjs/react-router-dom';
export default function Landing() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true); // add loading state
  
  const history=useHistory();

  const handleAdmin = () => {
  history.push("./admin-login-main")
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'options'), (snapshot) => {
      const optionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOptions(optionsData);
      setLoading(false); // set loading to false once data is loaded
    });

    return () => {
      unsubscribe();
    };
  }, []);
 



  return (
    <div className='land'>
   <Navbar
        backgroundColor="#333"
        textColor="#fff"
        buttons={[]}
        onClick={handleAdmin}
      />
     <h1>Connect with skilled developers and Get More Done: Discover Your Perfect Match on Our Techpeople!</h1>

<div className='main-con'>
<div className='box-hol'>
{loading ? ( 
    <div className="loader">
    <div className="spinner"></div>
  </div>
) : (
  options.map((option) => (
    <OptionBox key={option.id} option={option} />
  ))
)}
 <div className="box-container">
      <div>
        <div className="Heading">.NET Developer</div>
     
<div className="input-hol">

        <span>We Are Working On It...</span>
        
</div>
      </div>
    
    </div>
</div>
</div>
    </div>
  );
}
