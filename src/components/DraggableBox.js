import { memo, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { Box } from './Box.js'
import { ItemTypes } from './ItemTypes.js'


function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  }
}
export const DraggableBox = memo(function DraggableBox(props) {
  const { id, title, left, top, onConnect } = props; // ✅ Ensure onConnect is received
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title],
  )

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, []);

  //tested if the connect buttons worked 
  const handleConnectClick = () => {
    if (typeof onConnect === 'function') {
      onConnect(id)
    } else {
      console.error("onConnect is not a function", { onConnect, id })
    }
  }



  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableBox"
    >
      <button onClick={() => onConnect(id)}> ◀️ </button>
      <Box title={title} />
      <button onClick={() => onConnect(id)}> ▶️ </button>

      
    </div>
  )
})
