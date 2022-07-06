import React from 'react'
import { useNavigate } from "react-router-dom";


const Tabs = () => {
  const navigate = useNavigate();

  const goToCity = () => {
    navigate(`/City`);
  };
  const goToLatitude = () =>{
    navigate(`/Latitude`);
  };
  return (
    <div className='apps'>
      <div className='button'>
        <button className='button-1' onClick={() =>goToCity()}>
         Search by City
        </button>
        <button className='button-1' onClick={() =>goToLatitude()}>
         Search by Lat and Lan
        </button>
      </div>  
    </div>
  )
}

export default Tabs
