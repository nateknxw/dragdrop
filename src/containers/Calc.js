import React, { useState, useEffect } from "react";
import { MeshAnalysisCalcs } from "../components/MeshAnalysisCalcs";
import { NodalAnalysisCalcs } from "../components/NodalAnalysisCalcs";

import { parseCircuit, meshAnalysis } from "../components/meshCircuitAnalysisV3";
import { nodalAnalysis } from "../components/nodalCircuitAnalysisV2";

const Calc = ({ circuitLinkedList }) => {
  const [result, setResult] = useState(null);
  const [meshAnalysisResults, setMeshAnalysisResults] = useState(null);
  


  const handleCalculate = () => {
    console.log(" Calculate button clicked!");

    if (!circuitLinkedList || Object.keys(circuitLinkedList).length === 0) {
    console.error(" No circuit data available!");
    return;
    }

    //Latest attempt at the mesh analysis - works but not displaying fully
    const loop = parseCircuit(circuitLinkedList);
    console.log("Loop: ", loop);

    const meshAnalysisResults = meshAnalysis(loop);
    console.log("Mesh analysis results: ", meshAnalysisResults);

    setMeshAnalysisResults(meshAnalysisResults);
    

    //Latest attempt with the nodal 
    const nodalResult = nodalAnalysis(circuitLinkedList);
    //const nodalResult = "Not done yet"
    console.log("New Nodal analysis result: ", nodalResult)

    setResult({nodalResult, meshAnalysisResults});
    
  };

  
  useEffect(() => {
    console.log("Result State: ", result);
    
  }, [result, meshAnalysisResults]);

  return (
    <div className="calcs">
      <h2>Circuit Analysis Results</h2>
      <button onClick= {handleCalculate}
        className="calcButton">Calculate</button>
      
      {result && meshAnalysisResults && (
        <>
            <h3>Mesh Analysis Result</h3>
          
            <p>Total Resistance: {result.meshAnalysisResults.totalResistance} Ω</p>
            <p>Total Voltage: {result.meshAnalysisResults.totalVoltage} V</p>
            <p>Current: {result.meshAnalysisResults.current} A</p>

            <h3>Nodal Analysis Result</h3>
            <p>{result.nodalResult}</p>
        </>
      )}
    </div>
  );
};

export default Calc;
