// Function to parse the linked list and extract the loop for mesh analysis
export const parseCircuit = (components) => {
    let loop = [];
    let visited = new Set();
    let start = 'a'; // Assuming 'a' (Battery) is the starting point
  
    let currentId = start;
    while (!visited.has(currentId)) {
      visited.add(currentId);
      let component = components[currentId];
      loop.push(component);
      currentId = component.nextId;
    }
  
    return loop;
  };
  
  // Function to perform mesh analysis: Sum voltages and resistances to calculate current
  export const meshAnalysis = (loop) => {
    let totalResistance = 0;
    let totalVoltage = 0;
  
    for (let comp of loop) {
      if (comp.title === 'Battery') {
        totalVoltage += comp.voltage; // Summing voltages from sources
      } else if ('resistance' in comp) {
        totalResistance += comp.resistance; // Summing resistances
      }
    }
  
    const current = totalVoltage / totalResistance; // Ohm's law: I = V / R
    return {
      totalResistance,
      totalVoltage,
      current
    };
  };
  
  
  