import React, { useState } from 'react'
import '../App.css'

function Info () {
  const [selected, setSelected] = useState('neutral'); // default is neutral

  return (
    <div className='info'>
      <button onClick={() => setSelected('battery')} className='battBut'> Battery</button>
      <button onClick={() => setSelected('lightbulb')} className='lightBut'> Lightbulb </button>
      <button onClick={() => setSelected('resistor')} className='resBut'> Resistor</button>
      <button onClick={() => setSelected('wire')} className='wireBut'> Wire</button>

      <div className='explanation'>
        {selected === 'neutral' && (
          <p className='explain'>
            This circuit flows as a direct current, this means the current flows in only one direction, the direction is shown when you connect the circuit with the arrrows.
            Press the buttons for information on each component.
          </p>
        )}
        {selected === 'battery' && (
          <p className='expain'>
            This is a battery. Batteries provide the circuit with electricity. It is made up of cells that convert chemical energy into electrical energy. 
            Generally they hold small amounts of energy but rechargable batteries are becoming more and more common, like the ones in mobile phones or laptops and even in cars. 
          </p>
          
        )}
        {selected === 'lightbulb' && (
          <p className='expain'>
            This is a lightbulb. The electrical current heats the filament (thin high resistance wire that glows when it gets hot) in the bulb so that it gives out light.
          </p>
        )}
        {selected === 'resistor' && (
          <p className='expain'>
            This is a resistor. It limits the flow of electrical current, the resistor used here is a fixed resistor which means the resistance does not change.
          </p>
        )}
        {selected === 'wire' && (
          <p className='expain'>
            This is a wire. It is used to transmit electricity from the power source (battery in this circuit) to the other components in the circuit (the lightbulb and resistors here).
          </p>
        )}
      </div>
    </div>
  );
}

export default Info;
