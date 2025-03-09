import { create, all } from 'mathjs';

const math = create(all);

export const NodalAnalysisCalcs = (circuitMatrix) => {
  try {
    const numNodes = circuitMatrix.length;
    
    // Step 1: Set up the conductance matrix (G) and the voltage vector (V)
    let G = Array(numNodes).fill(0).map(() => Array(numNodes).fill(0));  // Conductance matrix (inverse of resistance)
    let V = Array(numNodes).fill(0);  // Voltage source vector
    
    // Step 2: Populate G (conductance matrix) and V (voltage vector)
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        const component = circuitMatrix[i][j];
        
        if (component && component.type === 'resistor') {
          const conductance = 1 / component.value;  // Conductance = 1 / resistance
          G[i][j] -= conductance;  // Current leaving node i to node j
          G[j][i] -= conductance;  // Current leaving node j to node i
          G[i][i] += conductance;  // Self-conductance for node i
          G[j][j] += conductance;  // Self-conductance for node j
        } 
        
        if (component && component.type === 'battery') {
          // Assign the battery voltage to the corresponding node's voltage vector
          V[i] = component.value;  // Voltage source at node i
        }
      }
    }

    // Log matrices for debugging purposes
    console.log('Conductance Matrix (G):', G);
    console.log('Voltage Vector (V):', V);

    //check if matrix is actually singular or if its a different issue
    const checkMatrixSingularity = (G) => {
        const determinant = math.det(G);
        console.log('Determinant of G:', determinant);
        if (determinant === 0) {
          return "Error: The conductance matrix is singular.";
        }
        return "Matrix appears solvable.";
      };
      
      
    const singularityCheck = checkMatrixSingularity(G);
    console.log(singularityCheck);

    // Step 3: Check if the matrix is singular by attempting LU decomposition
    const luDecomp = math.lusolve(G, V); // Use LU decomposition to check if solvable
    if (!luDecomp) {
      return "Error: The conductance matrix is singular and the system cannot be solved.";
    }

    // Step 4: Solve the system of linear equations G * V = I
    // We solve for V (node voltages) using math.js
    const nodeVoltages = math.lusolve(G, V);

    return nodeVoltages;

  } catch (error) {
    console.error(error);
    return "Error: Circuit not solvable or data invalid";
  }
};
