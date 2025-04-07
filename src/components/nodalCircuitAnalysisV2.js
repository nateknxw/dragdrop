import * as math from 'mathjs';

// Accepts a map of components (linked list format)
export const nodalAnalysis = (circuitLinkedList) => {
  // Check if it's a parallel circuit
  const isParallel = () => {
    const nodeMap = new Map();
    for (let key in circuitLinkedList) {
      const comp = circuitLinkedList[key];
      if (!nodeMap.has(comp.prevId)) nodeMap.set(comp.prevId, []);
      if (!nodeMap.has(comp.nextId)) nodeMap.set(comp.nextId, []);
      nodeMap.get(comp.prevId).push(comp);
      nodeMap.get(comp.nextId).push(comp);
    }
    return [...nodeMap.values()].some(arr => arr.length > 1); // Multiple components sharing a node
  };

  // Perform basic nodal analysis using G matrix
  const solveNodal = () => {
    const components = Object.values(circuitLinkedList);
    const voltageSources = components.filter(c => c.title === "Battery");
    const resistors = components.filter(c => c.resistance !== undefined);

    if (voltageSources.length === 0) {
      return "No voltage source found.";
    }

    const V = voltageSources[0].voltage; // Assume one voltage source
    const R = resistors.map(r => r.resistance);
    const N = resistors.length;

    if (N === 0) return "No resistors found in the circuit.";

    // Parallel resistors (simple model)
    if (isParallel()) {
      const totalReciprocal = R.reduce((sum, r) => sum + 1 / r, 0);
      const totalResistance = 1 / totalReciprocal;
      const totalCurrent = V / totalResistance;
      return `Parallel Circuit:\nTotal Resistance: ${totalResistance.toFixed(2)} Ω\nTotal Current: ${totalCurrent.toFixed(2)} A`;
    }

    // Series circuit: total R = sum of R
    const totalResistance = R.reduce((sum, r) => sum + r, 0);
    const totalCurrent = V / totalResistance;
    return `Series Circuit:\nTotal Resistance: ${totalResistance.toFixed(2)} Ω\nTotal Current: ${totalCurrent.toFixed(2)} A`;
  };

  // Call analysis
  return solveNodal();
};
