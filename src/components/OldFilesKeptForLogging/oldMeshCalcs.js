import { create, all} from 'mathjs'


const math = create(all)

export const MeshAnalysisCalcs = (circuitMatrix) => {
    

  //Find Resistance Matrix 
  const findResMatrix = () => {
    let size = circuitMatrix.length;
    let R = Array(size).fill(0).map(() => Array(size).fill(0));

    for (let i =0; i < size; i++){
      for (let j = 0; j < size; j++){
        const component = circuitMatrix[i][j];
        if (component.type === 'resistor' || component.type === 'lightbulb') {
          R[i][j] = component.value;
        } else if (component.type === 'wire'){
          R[i][j] = 0; //wire represents 0 resistance between meshes 
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
        if (component.type === 'battery') {
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

    //Log matrices for debugging 
    console.log('Resistance matrix: ', R);
    console.log('Voltage Matrix: ', V);

    //Check if resMatrix is invertible 
    const det = math.det(R);
    console.log('Determinant of R: ', det);
    
    if (det === 0){
      return "Error: Resistance matrix is singular (not solvable)";
    }

    //Check is the matrix dimensions match 
    if (R.length !== V.length){
      return "Error: Matrix dimensions do not match";
    }

    //Solve for mesh currents: I = R^-1 * V 
    const I = math.multiply(math.inv(R), V);

    //export result as array
    return I;

    }catch (error){
     return"Error: Circuit not solvable or data invalid";
    }
};