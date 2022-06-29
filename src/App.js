import React,{useState} from "react";
import axios from 'axios';


function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [err,setErr] = useState('')

  // window.addEventListener('enter',back)
  function back(){
  const backimg = document.querySelector("#app");
  // console.log(backimg);

  const desc = document.querySelector("#desc");
  // console.log(desc);

  }back()

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f7faf169c296333a5e46c865f7987a27`
  
  const searchLocation =async (event) =>{
    if(event.key === 'Enter'){
   try{
    const res=await axios.get(url)
      setData(res.data)
      console.log(res.data)
    }
    catch(err){
    setErr("Not Available")
    console.log(err)
    // .then((err)=>{console.log(err)})
  }
  }
  
  console.log(data.weather && data.weather[0])
  
  
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
      {data.name ? (
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}, {data.sys && data.sys.country}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp}℉</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
          </div>
          <div className="description" id="desc">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
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
      </div>):(<p>{err}</p>)}
    </div>
  );
}

export default App;
