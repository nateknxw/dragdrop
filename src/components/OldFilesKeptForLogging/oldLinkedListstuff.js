import React, { useState } from "react";
import { battery } from "../assets/battery";
import { lightbulb } from "../assets/lightbulb";
import { resistor } from "../assets/resistor";

// Node component to represent each item in the linked list
const Node = ({ data, next, prev }) => {
  return (
    <li>
      {prev && "<- "}
      {data}
      {next && " -> "}
      {next && <Node data={next.data} next={next.next} prev={next.prev} />}
    </li>
  );
};

export const DoublyLinkedList = () => {
  const [head, setHead] = useState(null);

  // Function to add a new node to the linked list
  const addNode = (data) => {
    const node = { data, next: head, prev: null };
    if (head) {
      head.prev = node;
    }
    setHead(node);
  };

  //work out how to fill out the linked list from what is on the grid here??
  //either fill w props from assets 

  return (
    <div>
      
      <ul>
        {head && <Node data={head.data} next={head.next} prev={head.prev} />}
      </ul>
      <button onClick={() => addNode("Node 1")}>Add Node 1</button>
      <button onClick={() => addNode("Node 2")}>Add Node 2</button>
      <button onClick={() => addNode("Node 3")}>Add Node 3</button>
    </div>
  );
};