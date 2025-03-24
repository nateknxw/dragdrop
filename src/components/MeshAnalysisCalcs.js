import { create, all } from 'mathjs';

const math = create(all);

export const MeshAnalysisCalcs = (circuitMatrix) => {

  console.table(circuitMatrix);

  const size = circuitMatrix.length;

  // Initialize resistance matrix (R) and voltage matrix (V)
  let R = Array(size).fill(0).map(() => Array(size).fill(0));
  let V = Array(size).fill(0);

  // 🔥 Loop through all loops (meshes)
  for (let i = 0; i < size; i++) {
    let loopRes = 0; // Sum of all resistances in the loop

    for (let j = 0; j < size; j++) {
      const component = circuitMatrix[i][j];

      if (component) {
        const title = component.title.toLowerCase(); // Convert to lowercase for consistency

        if (title === "resistor" || title === "lightbulb") {
          loopRes += component.value; // Add resistance

          // Off-diagonal elements represent mutual resistance (shared with another loop)
          if (i !== j) R[i][j] -= component.value;
        } 
        
        else if (title === "battery") {
          V[i] += component.value; // Add battery voltage to the mesh
        }
      }
    }

    // Set the diagonal element: total resistance in this loop
    R[i][i] = loopRes;
  }

  // ✅ Check if the resistance matrix is singular
  try {
    const det = math.det(R);
    if (det === 0) {
      console.error("⚠️ Error: Resistance matrix is singular (not solvable)");
      return "Error: Resistance matrix is singular (not solvable)";
    }

    // ✅ Solve for currents: I = R⁻¹ * V
    const I = math.multiply(math.inv(R), V);
    
    console.log("🔍 Resistance Matrix (R):", R);
    console.log("🔍 Voltage Vector (V):", V);
    console.log("✅ Mesh Currents (I):", I);
    
    return I;
  } catch (error) {
    console.error("⚠️ Error in matrix calculations:", error);
    return "Error: Circuit not solvable or data invalid";
  }
};