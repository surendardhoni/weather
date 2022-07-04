import React,{useState} from "react";
import axios from 'axios';
import clearsky from "../assets/clearsky.jpg"
import cloudy from '../assets/cloudy.jpg'
import rain from '../assets/rainy.jpg'


function Latitude(){
    const [data,setData] = useState({})
    const [lat,setLat] = useState('')
    const [lon,setLon] = useState('')
  const [error,setError] = useState('')

  function clear(){
    const climate=data.weather&&data.weather[0].main
    if(climate=='Clear'){
      document.getElementById('apps').style.backgroundImage=`url(${clearsky})`
    }
    else if(climate=='Clouds'){
      document.getElementById('apps').style.backgroundImage=`url(${cloudy})`
    }
    else if(climate=='Rain'){
      document.getElementById('apps').style.backgroundImage=`url(${rain})`
    }
   
  }clear()




const link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7b2ede42a1e819baa9723850caf467f8`

const searchLocation =async (event) =>{
    if(event.key === 'Enter'){
   try{
    const res=await axios.get(link)
      setData(res.data)
      setError("No Error")
      console.log(res.data)

    }
    catch(err){
    setError("City Not Found")
    setData(error);
    setData('')
    console.log(err)
  }
  }
}
return(
 <div className="app" id="apps">
    <div className="search">
    <input
     value={lat} 
     onChange={event =>setLat(event.target.value)} 
     type='number'
     onKeyPress={searchLocation}
     placeholder="Enter Latitude" />
  </div>
  <div className="search">
    <input
     value={lon} 
     onChange={event =>setLon(event.target.value)} 
     type='number'
     onKeyPress={searchLocation}
     placeholder="Enter Longitude" />
  </div>

{data ? (
    <div className='container'>
      <div className='top'>
        <div className='location'>
          <p>{data.name} {data.sys && data.sys.country}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp}K</h1> : null}
        </div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].description}</p> : null}
        </div>
        <div className="description" id="desc">
          {data.weather ? <p>
            {data.weather[0].main} 
            </p> : null}
        </div>
      </div>
      <div className="middle">
         <div className="lat">
          {data.coord ? <p>Latitude : {data.coord.lat}</p> : null}
        </div>
        <div className="lon">
          {data.coord ? <p>Longitude : {data.coord.lon}</p> : null}
        </div>
      </div>  
      <div className='bottom'>
        <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like}℉</p> : null}
          <p>Feels Like </p>
        </div>
        <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          <p>Humidity</p>
        </div>
        <div className="wind">
          {data.main ? <p className="bold">{data.wind.speed}MPH</p> : null}
          <p>Wind Speed</p>
        </div>
      </div>
    </div>):(<p id="all" className="center">{error}</p>)}
  </div>
);
}

export default Latitude;
