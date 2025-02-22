import React, {useCallback, useState} from "react";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import update from 'immutability-helper'


//import ".../App.css"
import "../Info"

const PictureList = [
    {
        id: 1,
        title: 'Battery',
        url: 'https://www.pinclipart.com/picdir/middle/56-561969_battery-clip-circuit-symbol-png-download.png'
    },
    {
        id: 2,
        title: 'Light-bulb',
        url: 'https://cdn.imgbin.com/21/5/8/imgbin-incandescent-light-bulb-electronic-symbol-circuit-diagram-lamp-light-9wtWsfyKNq5tFLHgTx44eNkPL.jpg'
    },
    {
        id: 3,
        title: 'Resistor',
        url: 'https://www.clipartbest.com/cliparts/RTA/eKd/RTAeKdyTL.gif'
    }
]

function DragDrop() {
    const [board, setBoard] = useState([]);

    const [{isOver}, drop] = useDrop(() => ({
        accept: "image", 
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id) => {
        const pictureList = PictureList.filter((picture) => id === picture.id);
        setBoard((board) => [...board, pictureList[0]]);
    };


    return(
        <>
        <div className="Pictures"> 
        {PictureList.map((picture)=> {
            return <Picture url={picture.url} id = {picture.id} />; 
        })} 
        </div>
        <div className="infoButtons"> 
        <button> //onClick={} *will be one of the info buttons NEED TO MOVE*  </button>

        </div>
        <div className="Board" ref={drop}> 
        {board.map((picture) => {
            return <Picture url={picture.url} id={picture.id} />;
        })}
        </div>
        </>
    )
}

export default DragDrop;