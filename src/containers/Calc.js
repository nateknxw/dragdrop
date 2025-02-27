import React from 'react'
import {boxes, setBoxes} from './Container'
import {DoublyLinkedList} from '../components/GridList'

//create a fucntion to work out how many spanning nodes in the circuit - i.e. how many summations equations will be required. 
//will use general metyhod over inspection method as there will likely be a voltage source - can look into having both methods if time 

//function genMethod(){
  //Va = cell1 
  //Vb = cell2 

  //i3 = i1 + i2 
  //i1 = (Va -Vb) / R1 
  //i2 = (Vc - Vb) / R2 
  //i3 = Vb / R3 


  
//}
function Calc () {

  //get linked list from the ui here 
  const listToMatrix = (DoublyLinkedList) => {
    //convert the linked list into a matrix 
  }

  //use the matrix to complete the analysis 
  
  return (
    <div className='calcs'>
      <p>Calculations will pop up here</p>

    </div>

    
  )
}
export default Calc

//export const Calc = memo(function Calc(props) {
    //const { id, title, left, top } = props
    //const [] = genMethod(
      //() => ({
        //type: ItemTypes.BOX,
        //item: { id, left, top, title },
      //}),
      //[id, left, top, title],
    //)
   
    
    //return (
      //<div className='calcs'>
       // <p>Calculations will pop up here </p>
  
     // </div>
  
      
    //)
  //})

