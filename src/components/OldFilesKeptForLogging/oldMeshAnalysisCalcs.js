import { create, all } from "mathjs";

const math = create(all);

export const MeshAnalysisCalcs = (nodeList) => {
    if (!Array.isArray(nodeList) || nodeList.length === 0) {
        console.error("❌ No nodes provided.");
        return { error: "No nodes in the circuit" };
    }

    let meshes = [];
    let voltageSources = [];
    let resistanceMatrix = [];
    
    const findLoops = (node, path = [], visited = new Set()) => {
        if (!node) return;

        let nodeId = `${node.x},${node.y}`;
        
        if (visited.has(nodeId)) {
            let loopStartIndex = path.findIndex(n => `${n.x},${n.y}` === nodeId);
            if (loopStartIndex !== -1) {
                let loop = path.slice(loopStartIndex);
                if (loop.length > 2) {
                    meshes.push(loop);
                    let totalVoltage = loop.reduce((sum, n) => (n.type === "battery" ? sum + n.value : sum), 0);
                    voltageSources.push(totalVoltage);
                }
            }
            return;
        }

        visited.add(nodeId);
        path.push(node);

        for (let nextNode of [node.up, node.down, node.left, node.right]) {
            if (nextNode) {
                findLoops(nextNode, [...path], new Set(visited));
            }
        }
    };

    for (let node of nodeList) {
        findLoops(node);
    }

    console.log("🔍 Found Meshes:", meshes);
    console.log("🔍 Number of Meshes Found:", meshes.length);
    console.log("🔍 Example Mesh:", meshes.slice(0, 5)); // Show only first 5


    if (meshes.length === 0) {
        return { error: "No valid circuit loops detected" };
    }

    let meshCount = meshes.length;
    resistanceMatrix = Array(meshCount).fill(0).map(() => Array(meshCount).fill(0));

    for (let i = 0; i < meshCount; i++) {
        let mesh = meshes[i];

        let resistanceSum = 0;
        for (let node of mesh) {
            if (node.type === "resistor" || node.type === "lightbulb") {
                resistanceSum += node.value;
            }
        }

        resistanceMatrix[i][i] = resistanceSum;
    }

    console.log("🛠 Resistance Matrix:", resistanceMatrix);
    console.log("⚡ Voltage Sources:", voltageSources);

    // Check if the resistance matrix is singular
    if (math.det(resistanceMatrix) === 0) {
      console.error("❌ Circuit matrix is singular, cannot compute solution.");
      return { error: "Circuit not solvable" };
    }

    

    let R = math.matrix(resistanceMatrix);
    let V = math.matrix(voltageSources.map(v => [v]));

    // Proceed with matrix inversion if it's not singular
    const inverseMatrix = math.inv(R); 

    try {
        let I = math.multiply(inverseMatrix, V)._data;
        console.log("✅ Calculated Currents:", I);
        return { currents: I, meshes, voltageSources };
    } catch (error) {
        console.error("❌ Matrix Error:", error);
        return { error: "Circuit not solvable" };
    }
};
