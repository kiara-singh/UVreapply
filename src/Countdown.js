import React, { useEffect } from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, ButtonGroup, Toast, ToastBody, ToastHeader, ToastContainer}from 'react-bootstrap'
import "./countdown.css";

function Countdown () {
    const [applied,setApplied]=useState(false);
    const [hours,setHours]=useState(2);
    const [minutes,setMinutes]=useState(0);
    const[seconds,setSeconds]=useState(0);
    const[show,setShow]=useState(false);
    const[notify,setNotify]=useState(false)
    const[buttonView,setButtonView]=useState(true)
    
    function notifyUser(){

        Notification.requestPermission().then((promise)=>{
          if(promise==="granted"){
            setNotify(true);
            setButtonView(false);
          }else if(promise==="denied"){
            setNotify(false);
            setButtonView(false);
          }
        });

    }


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
            if(notify){
                new Notification("Time to reapply!")
            }else{
                setShow(true)
            }
        }

        return ()=>clearInterval(interval);

    },[seconds,minutes,hours,applied,notify]);


    function reset(){
        setApplied(false)
        setShow(false)
        setHours(2)
        setMinutes(0)
        setSeconds(0)
    }

  return (
    <div className='center' >

        <div className='countdown'>
            <h1>{hours}:{minutes}:{seconds}</h1>
        </div>

        <div className='buttons'>
            <ButtonGroup variant="contained" aria-label="Basic button group">

                <Button variant="success" onClick={!applied ? ()=>setApplied(true) : null}>
                    {!applied ? "Apply" :"Have fun in the sun!"}
                </Button>

                <Button onClick={reset}>Reset</Button>

            </ButtonGroup>

        </div>

        <div className='resetButton'>
               
        </div>

        <div className='notification'>
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

            {buttonView && <button onClick={notifyUser()}>Turn on notifications</button>}

            {buttonView && <p>Please allow notifications. 
            If you deny, the app will instead alert you on this window. </p>}
        </div>  
    </div>
  )
}

export default Countdown
