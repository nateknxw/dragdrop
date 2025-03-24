import update from 'immutability-helper'
import { useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from '../components/DraggableBox.js'
import { ItemTypes } from '../components/ItemTypes.js'
import { snapToGrid as doSnapToGrid } from '../components/snapToGrid.js'
import '../App.css'

import {Battery, Resistor, Lightbulb} from '../assets/ComponentBase'



export const Container = ({circuitLinkedList, snapToGrid, onCircuitUpdate }) => {
  const [boxes, setBoxes] = useState({
    a: new Battery(60, -300, 15),
    b: new Lightbulb(100, -300, 10),
    c: new Resistor(140, -300, 5),
    d: new Resistor(140, -300, 5),
    e: new Resistor(140, -300, 5),
    
    
  });

  

  const [selectedBox, setSelectedBox] = useState(null); //Track selected box 
  const [connections, setConnections] = useState([]); // Stores connections between boxes

  



  // Updates circuit when changes occur
  useEffect(() => {
    if (circuitLinkedList.length > 0) {
      onCircuitUpdate(circuitLinkedList);
    }
  }, [circuitLinkedList, onCircuitUpdate]);

  

  //Move box on drag
  const moveBox = useCallback(
    (id, left, top) => {
      if (!boxes) {return}; 
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }), 
    )},
    [boxes],
  )

  //Connect boxes and update state 
  const connectBox = useCallback(
    (first, second) => {
      setConnections((prevConnections) => {
        //  Check if connection already exists to avoid unnecessary state updates
        if (prevConnections.some(conn => 
          (conn.from === first && conn.to === second) || 
          (conn.from === second && conn.to === first))
        ) {
          console.warn(` Connection already exists: ${first} -> ${second}`);
          return prevConnections; // Prevent unnecessary re-render
        }
  
        console.log(` Added connection: ${first} -> ${second}`);
        return [...prevConnections, { from: first, to: second }];
      });
  
      setBoxes((prevBoxes) => {
        if (!prevBoxes[first] || !prevBoxes[second]) return prevBoxes; //  Prevent undefined errors
  
        console.log("🔄 Updating Boxes:", first, second);

        const updatedBoxes = {
          ...prevBoxes,
          [first]: { ...prevBoxes[first], nextId: second },
          [second]: { ...prevBoxes[second], prevId: first },
        };

        // Call handleCircuitUpdate to update circuit state
        onCircuitUpdate(updatedBoxes);

        return updatedBoxes;
      });
    },
    [setBoxes, setConnections] //  Correct dependencies
  );
  
  
  //Handles the box selection and connections 
  const handleConnect = useCallback(
    (id) => {
      if (!selectedBox) {
        setSelectedBox(id);
      } else {
        if (selectedBox !== id) { //  Ensure different boxes
          connectBox(selectedBox, id);
        }
        setSelectedBox(null);
      }
    },
    [selectedBox, connectBox] //  Include `connectBox` as dependency
  );



  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)
        if (snapToGrid) {
          ;[left, top] = doSnapToGrid(left, top)
        }
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )


  
  

  return (
    <div ref={drop} className="Board">
      {/* SVG layer for rendering connections */}
      <svg className="connection-layer">
        {connections.map(({ from, to }, index) => {
          const fromBox = boxes[from];
          const toBox = boxes[to];

          if (!fromBox || !toBox) return null;

          console.log(`Drawing line: ${from} → ${to}`);

          const x1 = fromBox.left + 500; // Adjust for center
          const y1 = fromBox.top + 25;
          const x2 = toBox.left + 500;
          const y2 = toBox.top + 50;

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="red"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Render draggable boxes */}
      {Object.keys(boxes).map((key) => (
        <DraggableBox 
          key={key} 
          id={key} 
          {...boxes[key]} 
          onConnect = {handleConnect} 
        />
      ))}
    </div>
  );
}

// Function to convert the circuit stored in a linked list format to a matrix
function convertCircuitToMatrix(boxes, connections) {
  const keys = Object.keys(boxes);
  const size = keys.length;
  const matrix = Array(size).fill(null).map(() => Array(size).fill(null));

  connections.forEach(({ from, to }) => {
    const i = keys.indexOf(from);
    const j = keys.indexOf(to);

    if (i !== -1 && j !== -1) {
      const component = boxes[from];
      matrix[i][j] = {
        type: component.constructor.name.toLowerCase(),
        value: component.resistance || component.voltage || 0,
      };
    }
  });

  return matrix;
}
