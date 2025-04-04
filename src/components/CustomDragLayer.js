import { useDragLayer } from 'react-dnd'
import { BoxDragPreview } from './BoxDragPreview.js'
import { ItemTypes } from './ItemTypes.js'
import { snapToGrid } from './snapToGrid.js'
const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}
function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    }
  }
  let { x, y } = currentOffset
  if (isSnapToGrid) {
    x -= initialOffset.x
    y -= initialOffset.y
    ;[x, y] = snapToGrid(x, y)
    x += initialOffset.x
    y += initialOffset.y
  }
  const transform = `translate(${x}px, ${y}px)`
  return {
    position: 'fixed',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    transform,
    WebkitTransform: transform,
    zIndex: 100,
  }
}
export const CustomDragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }))
  function renderItem() {
    switch (itemType) {
      case ItemTypes.BOX:
        return <BoxDragPreview title={item.src} />
      default:
        return null
    }
  }
  if (!isDragging) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        {renderItem()}
      </div>
    </div>
  )
}
