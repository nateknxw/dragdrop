import { create, all } from 'mathjs';

const math = create(all);


export const findResMatrixFromLinkedList = (boxes, connections) => {
  const size = Object.keys(boxes).length;
  let R = Array(size).fill(0).map(() => Array(size).fill(0));

  connections.forEach(({ from, to }) => {
    const comp = boxes[from]; // Get the component
    if (comp && (comp.title === "Resistor" || comp.title === "Lightbulb")) {
      const resistance = comp.value || 0;
      let i = Object.keys(boxes).indexOf(from);
      let j = Object.keys(boxes).indexOf(to);

      if (i !== -1 && j !== -1) {
        R[i][i] += resistance;  // Add to diagonal (self-resistance)
        R[i][j] -= resistance;  // Subtract for adjacency
        R[j][i] -= resistance;
        R[j][j] += resistance;
      }
    }
  });

  return R;
};


export const findVoltMatrixFromLinkedList = (boxes) => {
  const size = Object.keys(boxes).length;
  let V = Array(size).fill(0);

  Object.keys(boxes).forEach((key, index) => {
    const comp = boxes[key];
    if (comp.title === "Battery") {
      V[index] += comp.value || 0;
    }
  });

  return V;
};


export const MeshAnalysisCalcs = (boxes, connections) => {
  try {
    const R = findResMatrixFromLinkedList(boxes, connections);
    const V = findVoltMatrixFromLinkedList(boxes);

    console.log("🔍 Resistance Matrix (R):");
    console.table(R);
    console.log("🔍 Voltage Matrix (V):", V);

    const det = math.det(R);
    if (det === 0) return "Error: Resistance matrix is singular (not solvable)";

    if (R.length !== V.length) return "Error: Matrix dimensions do not match";

    const I = math.multiply(math.inv(R), V);
    return I;
  } catch (error) {
    return "Error: Circuit not solvable or data invalid";
  }
};
