import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from '../components/DraggableBox.js'
import { ItemTypes } from '../components/ItemTypes.js'
import { snapToGrid as doSnapToGrid } from '../components/snapToGrid.js'
import '../App.css'

import {Battery, Resistor, Lightbulb} from '../assets/ComponentBase'



export const Container = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState({
    a: new Battery(60, -300, 15),
    b: new Lightbulb(100, -300, 10),
    c: new Resistor(140, -300, 5)
    
  });

  const [selectedBox, setSelectedBox] = useState(null); //Track selected box 
  const [connections, setConnections] = useState([]); // Stores connections between boxes

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

  const handleConnect = useCallback(
    (id) => {
      if (!selectedBox) {
        setSelectedBox(id);
      } else {
        if (selectedBox === id) {
          console.warn("Cannot connect a box to itself:", id);
          return; // 🚨 Prevent self-connection
        }
        
        if (connections.some(conn => (conn.from === selectedBox && conn.to === id) || (conn.from === id && conn.to === selectedBox))) {
          console.warn("Connection already exists:", selectedBox, "->", id);
          return; // 🚨 Prevent duplicate connections
        }
  
        connectBox(selectedBox, id);
        setSelectedBox(null); // Reset selection after connection
      }
    },
    [selectedBox, connections]
  );

  const connectBox = useCallback((first, second) => {
    setBoxes((prevBoxes) => {
      //console.log("Previous Boxes:", prevBoxes);
      //console.log("Connecting:", first, second);

      if (prevBoxes[first]?.nextId || prevBoxes[second]?.prevId) {
        console.warn("Boxes are already connected.");
        return prevBoxes;
      }

      return update(prevBoxes, {
        [first]: { nextId: { $set: second } },
        [second]: { prevId: { $set: first } },
      });
    });
  
    setConnections((prevConnections) => {
      const exists = prevConnections.some(
        (conn) =>
          (conn.from === first && conn.to === second) ||
          (conn.from === second && conn.to === first)
      );
      if (exists) {
        console.warn(`Connection already exists: ${first} -> ${second}`);
        return prevConnections;
      }
      return [...prevConnections, { from: first, to: second }];
    });
      
    },
    [setBoxes, setConnections] // ✅ Dependencies added
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
    [moveBox, snapToGrid],
  )

  

  return (
    <div ref={drop} className="Board">
      {/* SVG layer for rendering connections */}
      <svg className="connection-layer">
        {connections.map(({ from, to }, index) => {
          const fromBox = boxes[from];
          const toBox = boxes[to];

          if (!fromBox || !toBox || fromBox.left === undefined || toBox.left === undefined) {
            console.warn(`Skipping connection: ${from} -> ${to} due to missing position`);
            return null;
          }

          const x1 = fromBox.left + 50; // Adjust for center
          const y1 = fromBox.top + 25;
          const x2 = toBox.left + 50;
          const y2 = toBox.top + 25;

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Render draggable boxes */}
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} onConnect = { (id) => handleConnect(id)} />
      ))}
    </div>
  );
}
