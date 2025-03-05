import { create, all} from 'mathjs'

//stoppped this methods because realised instead of converting to a matrix n using this reaslised i can just use the linked list 
const math = create(all)

export const MeshAnalysisCalcs = (circuitMatrix) => {
    

  //Find Resistance Matrix 
  const findResMatrix = () => {
    let size = circuitMatrix.length;
    let R = Array(size)
    .fill(0)
    .map(() => Array(size).fill(0));

    for (let i =0; i < size; i++){
      for (let j = 0; j < size; j++){
        const component = circuitMatrix[i][j];
        if (component.title === 'Resistor' || component.title === 'Lightbulb') {
          R[i][j] = component.value;
        }
      }
    }
    return R;
  };

  //Find Voltage Matrix 
  const findVoltMatrix = () => {
    let size = circuitMatrix.length;
    let V = Array(size).fill(0); //Fills matrix with 0s

    for (let i =0; i < size; i++){
      for(let j=0; j < size; j++){
        const component = circuitMatrix[i][j];
        if (component.title === 'Battery') {
          V[i] += component.value //Sums the voltage in each row 
        }
      }
    }
    return V;
  };

  //Solve circuit with Mesh analysis (nodal is not good for series circuits)
  try {
    const R = findResMatrix();
    const V = findVoltMatrix();

    //Solve for mesh currents: I = R^-1 * V 
    const I = math.multiply(math.inv(R), V);
    //export result as array
    return I;
    }catch (error){
     return"Error: Circuit not solvable or data invalid";
    }
};