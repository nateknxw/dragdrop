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
    
  })
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )
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

  const connectBox = (first, second ) => {
    
    for (let i =0; i < boxes.length; i++){
      let box = boxes[i];
      if (box.prevId === first){
        box.prev = [second];
      }
      if(box.prevId === second){
        box.prev = [first];
      }
      if(box.nextId === first){
        box.next = [second];
      }
      if(box.nextId === second){
        box.next = [first];
      }
    }
  }

  connectBox(3,4)
  return (
   
    <div ref={drop} className="Board">
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} />
      ))}
    </div>
  
  )
}
