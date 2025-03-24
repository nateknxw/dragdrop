import React, { useState, useEffect } from "react";
import { MeshAnalysisCalcs } from "../components/linkedListMeshCalcs";
import { NodalAnalysisCalcs } from "../components/NodalAnalysisCalcs";



const convertCircuitToMatrix = (circuit) => {
  console.log(" Converting circuit to mesh matrix...");

  let loops = [];
  let visited = new Set();

  // 🔄 Function to detect loops in the circuit
  const findLoop = (start, path = [], current = start) => {
    if (path.includes(current) && path[0] === current) {
      loops.push([...path]); // Store full loop
      return;
    }

    if (!circuit[current] || visited.has(current)) return;

    path.push(current);
    visited.add(current);

    let nextNodes = Array.isArray(circuit[current].nextId)
      ? circuit[current].nextId
      : [circuit[current].nextId];

    for (let next of nextNodes) {
      if (next && circuit[next]) {
        findLoop(start, [...path], next);
      }
    }
  };

  // 🔄 Find all loops
  Object.keys(circuit).forEach((key) => {
    if (!visited.has(key)) {
      findLoop(key);
    }
  });

  console.log("🔁 Detected loops:", loops);

  // 🟢 Initialize square matrix with 0s
  let matrixSize = loops.length;
  let matrix = Array.from({ length: matrixSize }, () =>
    Array(matrixSize).fill(0)
  );

  // 🔢 Populate the matrix
  loops.forEach((loop, i) => {
    loop.forEach((node, j) => {
      let resistance = circuit[node]?.resistance || 0;

      // Diagonal elements: Sum of resistances in the loop
      matrix[i][i] += resistance;

      // Off-diagonal elements: Mutual resistances (negative values)
      if (j < loop.length - 1) {
        let nextNode = loop[j + 1];
        let mutualResistance = circuit[nextNode]?.resistance || 0;
        matrix[i][(i + 1) % matrixSize] -= mutualResistance;
      }
    });
  });

  console.log("✅ Mesh Analysis Matrix:", matrix);
  return matrix;
};

const Calc = ({ circuitLinkedList }) => {
  const [result, setResult] = useState(null);
  

  /**useEffect(() => {
    if (circuitLinkedList) {
        const convertedMatrix = convertCircuitToMatrix(circuitLinkedList);
        setMatrix(convertedMatrix);
        console.log("Updated Circuit Matrix:", convertedMatrix);
    }
  }, [circuitLinkedList]);
  */

  const handleCalculate = () => {
    console.log(" Calculate button clicked!");

    if (!circuitLinkedList || Object.keys(circuitLinkedList).length === 0) {
    console.error(" No circuit data available!");
    return;
    }

    const circuitMatrix = convertCircuitToMatrix(circuitLinkedList);
    console.log(" Updated Circuit Matrix:", circuitMatrix);

    const meshResult = MeshAnalysisCalcs(circuitMatrix);
    console.log("Mesh Result:", meshResult);

    const nodalResult = NodalAnalysisCalcs(circuitMatrix);
    console.log("Nodal Result:", nodalResult);

    setResult({ meshResult, nodalResult });
  };

  return (
    <div className="calcs">
      <h2>Circuit Analysis Results</h2>
      <button onClick= {handleCalculate}
        className="calcButton">Calculate</button>
      
      {result && (
        <>
            <h3>Mesh Analysis Result</h3>
            <pre>{JSON.stringify(result.meshResult, null, 2)}</pre>
            <h3>Nodal Analysis Result</h3>
            <pre>{JSON.stringify(result.nodalResult, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default Calc;
