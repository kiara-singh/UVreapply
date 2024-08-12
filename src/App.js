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

  // const[notify,setNotify]=useState(false)

  // function notifyUser(){

  //     Notification.requestPermission().then((promise)=>{
  //       if(promise==="granted"){
  //         new Notification("Test");
  //       }
  //     });
  // }
  


  
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

//   function colorCodeDivs() {
//   const colors = ['#FFC0CB', '#ADD8E6', '#98FB98', '#FFD700', '#FFA07A', '#FF6347', '#87CEEB', '#98FF98', '#FF69B4', '#DDA0DD', '#FFA500', '#00FF00']; // 12 predefined colors
//   const divs = Array.from(document.querySelectorAll('div'));

//   divs.forEach((div, index) => {
//     const colorIndex = index % colors.length;
//     div.style.backgroundColor = colors[colorIndex];
//     div.textContent = `Div ${index + 1}`;
//   });
// }


  return (
    <div  style={{backgroundColor,borderColor:'#FFC0CB' }} className="App" >

      
      <div style={{backgroundColor:'#ADD8E6' }} className="search">
        <input
        value={location}
        onChange={event=>setLocation(event.target.value)}
        onKeyDown={searchLocation}
        placeholder='Enter location'
        type="text"
        />
      </div>

      <div style={{backgroundColor:'#98FB98'}} className="container">
        <div style={{backgroundColor:'#FFD700'}} className="top">

          <div style={{backgroundColor: '#FFA07A' }} className="location">
            <p>{data.name}</p>
          </div>

          <div style={{backgroundColor: '#FF6347' }} className="UV">
          {UV.result ? <h1>UV INDEX: {UV.result.uv}</h1> : null}
          </div>

          <div style={{backgroundColor:'#87CEEB'}} className="reminder">
            <Countdown/>
          </div>

          <div style={{backgroundColor:'#98FF98' }} className="description">
          {data.weather ? <p>{data.weather[0].main}</p>:null}
          </div>

        </div>
        <div style={{backgroundColor:'#DDA0DD'}} className="bottom">


          <div style={{backgroundColor:'#FF69B4' }} className="temp">
            {data.main ? <p>{data.main.temp}C</p>:null}
            <p>Temperature</p>
          </div>

          <div style={{backgroundColor:'#FFA500' }} className="maxUV">
            {UV.result ? <p>{UV.result.uv_max} at {getTime(UV.result.uv_max_time)}</p>:null}
            <p>Max UV</p>
          </div>

          <div style={{backgroundColor:'#00FF00' }} className="sunscreen">
            <p>{SPF()}</p>
            <p>SPF Reccomendation</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
