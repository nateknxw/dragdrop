import { DndProvider } from "react-dnd";
import{HTML5Backend} from 'react-dnd-html5-backend';

//import DragDrop from "./components/OldFilesKeptForLogging/DragDrop";
import Info from './containers/Info';
import Learn from "./containers/Learn";
import Calc from './containers/Calc';

import { CustomDragLayer } from "./components/CustomDragLayer";
import { Container } from "./containers/Container";
//import Picture from "./components/OldFilesKeptForLogging/Picture";


function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Learn/>
        <Calc/>
       
        <CustomDragLayer />
        <Container snapToGrid={true}/>
        <Info/>
        
        
      </div>

    </DndProvider>
    
  );
}



export default App;
