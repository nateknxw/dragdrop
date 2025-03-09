//temporary file for writing the calculations - will have something else to take data from ui to linked list then feed that to the calcs 
class CircuitNode {
    constructor(x, y, type, value) {
      this.x = x;
      this.y = y;
      this.type = type || "wire"; // Default to "wire" if empty
      this.value = value || 0;
      this.up = null;
      this.down = null;
      this.left = null;
      this.right = null;
    }
  }
  
  const buildLinkedListFromMatrix = (matrix) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let nodeMatrix = Array.from({ length: rows }, () => Array(cols).fill(null));

  
    let nodeList = []; // Store all nodes for easy access
  
    // Create nodes
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let cell = matrix[i][j] || {};
        let node = new CircuitNode(i,j, (cell.type || "wire").toLowerCase(), cell.value || 0);
        
        nodeMatrix[i][j] = node;
        nodeList.push(node);

        //check coords are right 
        console.log(`🛠 Created node: (${i}, ${j}) Type: ${node.type} Value: ${node.value}`);
      }
    }
  
    // Link nodes
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let node = nodeMatrix[i][j];
        if (i > 0) node.up = nodeMatrix[i - 1][j];
        if (i < rows - 1) node.down = nodeMatrix[i + 1][j];
        if (j > 0) node.left = nodeMatrix[i][j - 1];
        if (j < cols - 1) node.right = nodeMatrix[i][j + 1];
      }
    }

    console.log("Node List before return: ", nodeList)
  
    return nodeList; // Return head node
  };
  
  // Dummy circuit matrix
  const dummyMatrix = [
    [{}, {}, { type: "resistor", value: 10 }, {}],
    [{ type: "battery", value: 5 }, {}, {}, {}],
    [{}, {}, {}, { type: "lightbulb", value: 15 }],
    [{}, {}, {}, {}]
  ];
  
  // Convert to linked list
  const circuitLinkedList = buildLinkedListFromMatrix(dummyMatrix);

  console.log(circuitLinkedList);
  
  // Export linked list for testing
  export default circuitLinkedList;
  