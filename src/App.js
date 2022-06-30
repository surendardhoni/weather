import React,{useState} from "react";
import axios from 'axios';
import clearsky from "./assets/clearsky.jpg"
import cloudy from './assets/cloudy.jpg'
import rain from './assets/rainy.jpg'
import sun from './assets/sun.jpg'


function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [error,setError] = useState('')

  function clear(){
    const climate=data.weather&&data.weather[0].main
    if(climate=='Clear'){
      document.getElementById('app').style.backgroundImage=`url(${clearsky})`
    }
    else if(climate=='Clouds'){
      document.getElementById('app').style.backgroundImage=`url(${cloudy})`
    }
    else if(climate=='Rain'){
      document.getElementById('app').style.backgroundImage=`url(${rain})`
    }
    else if(climate==''){
      // document.getElementById('app').style.backgroundImage=`url(${sun})`

    }
  }clear()

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f7faf169c296333a5e46c865f7987a27`
  
  const searchLocation =async (event) =>{
    if(event.key === 'Enter'){
   try{
    const res=await axios.get(url)
      setData(res.data)
      setError("No Error")
      console.log(res.data)

    }
    catch(err){
    setError("Not Available")
    setData(error);
    setData('')
    console.log(err)
  }
  }
  
  }
  return (
    <div className="app" id="app">
      <div className="search">
        <input
         value={location} 
         onChange={event =>setLocation(event.target.value)} 
         type='text'
         onKeyPress={searchLocation}
         placeholder="Enter Location" />
      </div>
      {data ? (
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name} {data.sys && data.sys.country}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}℉</h1> : null}
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
      </div>):(<p id="all">{error}</p>)}
    </div>
  );
}

export default App;
