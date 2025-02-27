import React, { useState } from 'react';

function Node({ prev, props, next }) {
  return (
    <li>
        {prev && <Node value={prev.value} next={prev.next} />}
        {props}
        {next && <Node value={next.value} next={next.next} />}
    </li>
  );
}

function LinkedList() {
  const [head, setHead] = useState(null);
  const [tail, setTail] = useState(null);

  function addNode(value) {
    const node = { value, next: null };
    if (!head) {
      setHead(node);
      setTail(node);
    } else {
      tail.next = node;
      setTail(node);
    }
  }

  return (
    <div>
      <ul>
        {head && <Node value={head.value} next={head.next} />}
      </ul>
      <button onClick={() => addNode(Math.random())}>Add Node</button>
    </div>
  );
}

export default LinkedList;