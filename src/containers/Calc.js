import React from 'react';
import {MeshAnalysisCalcs} from '../components/MeshAnalysisCalcs';
import { NodalAnalysisCalcs } from '../components/NodalAnalysisCalcs';
//import circuitLinkedList from '../components/GridList';



function Calc() {
  const dummyMatrix = [
    [{ type: "resistor", value: 10 }, { type: "resistor", value: 5 }, { type: "wire", value: 0 }, {}],  // Mesh 1
    [{ type: "battery", value: 5 }, { type: "resistor", value: 10 }, { type: "wire", value: 0 }, {}],   // Mesh 2
    [{ type: "wire", value: 0 }, { type: "resistor", value: 5 }, { type: "lightbulb", value: 15 }, { type: "wire", value: 0 }], // Mesh 3
    [{ type: "wire", value: 0 }, { type: "wire", value: 0 }, { type: "resistor", value: 5 }, { type: "wire", value: 0 }] // Mesh 4
  ];

  const simpleCircuit = [
    [{ type: "resistor", value: 10 }, { type: "resistor", value: 5 }, { type: "wire", value: 0 }],
    [{ type: "battery", value: 5 }, { type: "resistor", value: 10 }, { type: "wire", value: 0 }],
    [{ type: "wire", value: 0 }, { type: "resistor", value: 5 }, { type: "lightbulb", value: 15 }]
  ];
  

  

  const meshResult = MeshAnalysisCalcs(simpleCircuit);
  console.log("Mesh Result:", meshResult);

  const nodalResult = NodalAnalysisCalcs(simpleCircuit);
  console.log(" Nodal Result: ", nodalResult)



  return (
    <div className='calcs'>
      <h2>Circuit Analysis Results</h2>
     
      {meshResult.error ? (
        <p style={{ color: "red" }}>{meshResult.error}</p>
      ) : (
        <pre>{JSON.stringify(meshResult, null, 2)}</pre>
      )}

      {nodalResult.error ? (
        <p style={{ color: "red" }}>{nodalResult.error}</p>
      ) : (
        <pre>{JSON.stringify(nodalResult, null, 2)}</pre>
      )}

    </div>
  );
}

export default Calc;