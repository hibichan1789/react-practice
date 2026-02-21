// src/App.tsx

import { useState } from "react";
import { Fragment } from "react";
export default function BoxList(){
  const [boxes, setBoxes] = useState<string[]>(Array(9).fill("?"));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winner = calculateWinner(boxes);
  function changeBox(targetIndex:number){
    if(boxes[targetIndex] !== "?" || winner){
      return;
    }
    const nextBoxes = boxes.map((box, boxIndex) =>{
                if(boxIndex === targetIndex){
                box = xIsNext ? "X" : "O";
                }
              return box;
              });
    setBoxes(nextBoxes);
    setXIsNext(!xIsNext);
  }
  return(
    <div>
      {winner && <p>勝者は {winner} !!!!</p>}
      {boxes.map((box, boxIndex) => {
        return(
          <Fragment key={boxIndex}>
            <button onClick={()=>changeBox(boxIndex)}>{box}</button>
            {boxIndex % 3 === 2 ? <br/> : ""}
          </Fragment>
        );
    })}
    </div>
  );
}

function calculateWinner(boxes:string[]){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for(const line of lines){
    const [a, b, c] = line;
    if(boxes[a] !== "?" && boxes[a] === boxes[b] && boxes[a] === boxes[c]){
      return boxes[a];
    }
  }
  return null
}