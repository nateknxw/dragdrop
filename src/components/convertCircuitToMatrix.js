export const convertCircuitToMatrix = (startNode) => {
    let meshList = []; // Store discovered meshes
    let componentMap = new Map(); // Store components by ID
    let queue = [startNode]; // Start traversal from battery
    let visited = new Set(); // Track visited components

    // 🔄 Traverse the circuit graph
    while (queue.length > 0) {
        let node = queue.shift();
        if (visited.has(node)) continue;
        visited.add(node);
        componentMap.set(node.prevId, node); // Map ID to component

        // Add connected components to queue
        for (let next of node.next) {
            queue.push(next);
        }
    }

    // ✅ Convert components to matrix format
    let size = componentMap.size;
    let R = Array(size).fill(0).map(() => Array(size).fill(0)); // Resistance matrix
    let V = Array(size).fill(0); // Voltage matrix

    componentMap.forEach((node, index) => {
        if (node.title.toLowerCase() === "battery") {
            V[index] += node.voltage; // Assign voltage to the mesh
        } else if (node.title.toLowerCase() === "resistor" || node.title.toLowerCase() === "lightbulb") {
            R[index][index] += node.resistance; // Add resistance to diagonal

            // Handle shared resistances between meshes
            for (let next of node.next) {
                if (componentMap.has(next.prevId)) {
                    let nextIndex = [...componentMap.keys()].indexOf(next.prevId);
                    R[index][nextIndex] -= node.resistance;
                    R[nextIndex][index] -= node.resistance;
                }
            }
        }
    });

    return { R, V };
};
