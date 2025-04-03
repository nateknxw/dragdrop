import React, { useState } from 'react'
import '../App.css'
//import Button from '../components/OldFilesKeptForLogging/Button'

function Info () {
  const [neutral, setNeutral] = useState(0);
  const [battery, setBattery] = useState(1);
  const [lightbulb, setLightbulb] = useState(2);
  const [resistor, setResistor] = useState(3);
  const [wire, setWire] = useState(4);

  const neutralHandler = () => {
    setNeutral(true);
    setBattery(false);
    setLightbulb(false);
    setResistor(false);
    setWire(false);
  };
  const batteryHandler = () => {
    setNeutral(false);
    setBattery(true);
    setLightbulb(false);
    setResistor(false);
    setWire(false);
  };
  const lightbulbHandler = () => {
    setNeutral(false);
    setBattery(false);
    setLightbulb(true);
    setResistor(false);
    setWire(false);
  };

  const resistorHandler = () => {
    setNeutral(false);
    setBattery(false);
    setLightbulb(false);
    setResistor(true);
    setWire(false);
  };

  const wireHandler = () => {
    setNeutral(false);
    setBattery(false);
    setLightbulb(false);
    setResistor(false);
    setWire(true);
  };

  return (
    <div className='info'>
      //onload={neutralHandler}
      <button onClick={batteryHandler} className='battBut'> Battery</button>
      <button onClick={lightbulbHandler} className='lightBut'> Lightbulb </button>
      <button onClick={resistorHandler} className='resBut'> Resistor</button>
      <button onClick={wireHandler} className='wireBut'> Wire</button>
      <div className='explanation'>
        {neutral && (
          <p className='explain'>
            Press button for information on each component
          </p>
        )}
        {battery && (
          <p className='expain'>
            This is a battery.
            Batteries provide the cirucit with electricity. 
          </p>
        )}
        {lightbulb && (
          <p className='expain'>
            This is a lightbulb.
          </p>
        )}
        {resistor && (
          <p className='expain'>
            This is a resistor.
          </p>
        )}
        {wire && (
          <p className='expain'>
            This is a wire.
          </p>
        )}
      </div>
      

    </div>

    
  )

  

}
export default Info