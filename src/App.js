import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Countdown from "./Countdown";
import "./index.css";
import moment from 'moment';



function App() {
  const[data,setData]=useState({})
  const[location,setLocation]=useState('')
  const[lat,setLat]=useState(0)
  const[long,setLong]=useState(0)
  const[UV,setUV]=useState([])

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=cd990b4f0752b81744e02484bddfa385&units=metric`

  function SPF(){
    if(UV.result){
      if((UV.result.uv)>=3){
        console.log("yes")
        return "YES!"
      }else{
        console.log("no")
        return "Not needed"
      }
    }
    console.log("end")
  }

  function getTime(time){
    return(moment(time).format("h:mm a"))
  }
  
  //get coordinates
  const searchLocation=(event)=>{
    if(event.key==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  useEffect(()=>{
    if(data&&data.coord){
      setLat(data.coord.lat);
      setLong(data.coord.lon);
    }
  },[data]);


  useEffect(()=>{
    if(lat&&long){
      axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${long}`, {
        headers: {
          'x-access-token': 'openuv-dln7c1rlyr3t1yw-io',
          'Content-Type': 'application/json',
        },
      })
      .then((result) => {
        setUV(result.data)
      })
      .catch((err) => console.error(err));
    }
  },[lat,long]);



  return (
    <div className="App">
      
      <div className="search">
        <input
        value={location}
        onChange={event=>setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter location'
        type="text"
        />
      </div>

      <div className="container">
        <div className="top">

          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="UV">
          {UV.result ? <h1>UV INDEX: {UV.result.uv}</h1> : null}
          </div>

          <div className="reminder">
            <Countdown/>
          </div>

          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p>:null}
          </div>

        </div>
        <div className="bottom">

          <div className="temp">
            {data.main ? <p>{data.main.temp}C</p>:null}
            <p>Temperature</p>
          </div>

          <div className="maxUV">
            {UV.result ? <p>{UV.result.uv_max} at {getTime(UV.result.uv_max_time)}</p>:null}
            <p>Max UV</p>
          </div>

          <div className="SPF Reccomended?">
            <p>{SPF()}</p>
            <p>SPF Reccomendation</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
