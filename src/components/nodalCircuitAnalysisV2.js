import * as math from 'mathjs';
import React from 'react';


//THIS FILE DOES NOT FULLY WORK
export const nodalAnalysis = (circuitLinkedList) => {
  //Check if the circuit is parallel based on connections 
  const isParallel = () => {
    let nodes = new Set();

    //Iterate over the circuit components to check node connections 
    for(let key in circuitLinkedList){
        const component = circuitLinkedList[key];
        nodes.add(component.prevId);
        nodes.add(component.nextId);
    }

    //If there are multiple nodes, the circuit is likely parallel 
    return nodes.size > 2; 
  };

  //Perform nodal analysis 
  const nodalAnalysis = () => {
    if (isParallel()) {
        //Do analysis here 
        const result = "Analysis result if parallel circuit";
        return result; 
    }else {
        //For series circuit will use Ohm's law and compute total resistance 
        const totalResistance = Object.values(circuitLinkedList).reduce(
            (acc, component) => acc + (component.resistance || 0 ),
            0
        );
        return "Total resistance in the series circuit: ${totalResistance} Ohms. "
    }
  }
}
