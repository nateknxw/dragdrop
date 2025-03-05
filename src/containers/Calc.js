import React from 'react';
import {MeshAnalysisCalcs} from '../components/MeshAnalysisCalcs';
import circuitLinkedList from '../components/GridList';

function Calc() {
  console.log("🔌 Circuit Linked List:", circuitLinkedList);

  

  console.log("🚀 Passing nodeList to MeshAnalysisCalcs:", circuitLinkedList);
  const result = MeshAnalysisCalcs(circuitLinkedList);
  console.log("🔍 Result:", result);

  return (
    <div className='calcs'>
      <h2>Circuit Analysis Results</h2>
     
      {result.error ? (
        <p style={{ color: "red" }}>{result.error}</p>
      ) : (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

export default Calc;