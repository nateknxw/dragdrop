import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from '../components/DraggableBox.js'
import { ItemTypes } from '../components/ItemTypes.js'
import { snapToGrid as doSnapToGrid } from '../components/snapToGrid.js'
import '../App.css'

import battery from '../assets/battery'
import lightbulb from '../assets/lightbulb'
import resistor from '../assets/resistor'


export const Container = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: -300, title: 'Battery', voltage: 15},
    b: { top: 60, left: -300, title: 'Battery', voltage: 15},
    c: { top: 100, left: -300, title: 'Light-bulb', voltage: 10},
    d: { top: 140, left: -300, title: 'Light-bulb', voltage: 10},
    e: {top: 180, left:-300, title: 'Resistor', resistance: 3},
    f: {top: 220, left: -300, title: 'Wire', current: 5},
    g: {top: 260, left: -300, title: 'Wire', current: 5},
    h: {top: 300, left: -300, title: 'Wire', current: 5},
    i: {top: 340, left: -300, title: 'Wire', current: 5},
    j: {top: 380, left: -300, title: 'Wire', current: 5},
    k: {top: 420, left: -300, title: 'Wire', current: 5},
    l: {top: 460, left: -300, title: 'Wire', current: 5},
    m: {top: 500, left: -300, title: 'Wire', current: 5},
    n: {top: 540, left: -300, title: 'Wire', current: 5},
    o: {top: 580, left: -300, title: 'Wire', current: 5},
    p: {top: 620, left: -300, title: 'Wire', current: 5},
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
