import React, { useEffect } from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Toast, ToastBody, ToastHeader, ToastContainer}from 'react-bootstrap'
import "./countdown.css";

function Countdown () {
    const [applied,setApplied]=useState(false);
    const [hours,setHours]=useState(0);
    const [minutes,setMinutes]=useState(0);
    const[seconds,setSeconds]=useState(5);
    const[show,setShow]=useState(false);

    useEffect(()=>{
        let interval;
        if(applied){
            interval=setInterval(()=>{
                if(seconds>0){
                    setSeconds(s=>s-1)
                }else if(minutes>0){
                    setMinutes(m=>m-1)
                    setSeconds(59)
                }else if(hours>0){
                    setHours(h=>h-1)
                    setMinutes(59)
                    setSeconds(59)
                }
            },1000)  
        }

        if(seconds===0 && minutes===0 && hours===0){
            setShow(true)
        }

        return ()=>clearInterval(interval);

    },[seconds,minutes,hours,applied]);


    function reset(){
        setApplied(false)
        setShow(false)
        setHours(0)
        setMinutes(0)
        setSeconds(5)
    }

  return (
    <div className='center' >

        <div className='countdown'>
            <h1>{hours}:{minutes}:{seconds}</h1>
        </div>

        <div className='applyButton'>
            <Button variant="success" onClick={!applied ? ()=>setApplied(true) : null} >  {!applied ? "Apply" :"Have fun in the sun!"}</Button>
        </div>

        <div className='resetButton'>
                <Button onClick={reset}>Reset</Button>
        </div>

        <div className='notification'>
            {/* {show&&   <Alert variant="danger" onClose={()=>setShow(false)} dismissible> <Alert.Heading>Time to reapply</Alert.Heading> </Alert>} */}
            {
                show && 
                <ToastContainer className="notification" position="top-end">
                    <Toast onClose={reset}>
                        <ToastHeader>
                                Reapplication reminder!
                        </ToastHeader>
                        <ToastBody className="Dark">
                                It's been two hours, time to reapply!
                        </ToastBody>
                    </Toast>
                </ToastContainer>
            }
        </div>

       

    </div>

   
  )
}

export default Countdown
