import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from '../components/DraggableBox.js'
import { ItemTypes } from '../components/ItemTypes.js'
import { snapToGrid as doSnapToGrid } from '../components/snapToGrid.js'
import '../App.css'

import {battery} from '../assets/battery'
import lightbulb from '../assets/lightbulb'
import resistor from '../assets/resistor'



export const Container = ({ snapToGrid }) => {
  const batObj = {battery}
  const batTop = batObj.battery.top
  const batLeft = batObj.battery.left
  const batTitle = batObj.battery.title
  const batVolt = batObj.battery.voltage
  const [boxes, setBoxes] = useState({
    a: {top :batTop, left: batLeft, title: batTitle, voltage: batVolt},
    b: {top: 60, left: -300, title: 'Battery', voltage: 15},
    c: { top: 100, left: -300, title: 'Light-bulb', voltage: 10},
    d: { top: 100, left: -300, title: 'Light-bulb', voltage: 10},
    e: {top: 140, left:-300, title: 'Resistor', resistance: 3},
    f: {top: 140, left:-300, title: 'Resistor', resistance: 3},
    g: {top: 140, left:-300, title: 'Resistor', resistance: 3},
    h: {top: 140, left:-300, title: 'Resistor', resistance: 3},
    
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
  return (
   
    <div ref={drop} className="Board">
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} />
      ))}
    </div>
  
  )
}
