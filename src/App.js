import { DndProvider } from "react-dnd";
import{HTML5Backend} from 'react-dnd-html5-backend';

//import DragDrop from "./components/OldFilesKeptForLogging/DragDrop";
import Info from './containers/Info';
import Learn from "./containers/Learn";
import Calc from './containers/Calc';

import { CustomDragLayer } from "./components/CustomDragLayer";
import { Container } from "./containers/Container";
import React, { useState } from "react";
//import Picture from "./components/OldFilesKeptForLogging/Picture";


function App() {

  const [circuitLinkedList, setCircuitLinkedList] = useState([]);

  // Function to update circuit state
  const handleCircuitUpdate = (newCircuit) => {
    console.log("Updating circuit:", newCircuit);
    setCircuitLinkedList(newCircuit);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Learn/>
        <Calc  circuitLinkedList={circuitLinkedList} />
       
        <CustomDragLayer />
        <Container circuitLinkedList={circuitLinkedList} snapToGrid={true} onCircuitUpdate = {handleCircuitUpdate}/>
        <Info/>
        
        
      </div>

    </DndProvider>
    
  );
}



export default App;
