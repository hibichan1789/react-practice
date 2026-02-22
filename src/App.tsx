// src/App.tsx

import { useState } from "react";

const highCountStyle =  {
  color:"red"
}
function Display({count}:{count:number}){
  return <p style={count>=100 ? highCountStyle : {}}>{count}</p>
}
function CountButton({countDiff, isAdd, clickAction}:{countDiff:number, isAdd:boolean, clickAction:()=>void}){
  return(
    <button onClick={clickAction}>{isAdd ? "+" : "-"} {countDiff}</button>
  );
}
function ResetButton({clickAction}:{clickAction:()=>void}){
  return <button onClick={clickAction}>Reset</button>
}
const initialCount = 100;
const countDiff = 10;
export default function AppComponent(){
  const [currentCount, setCurrentCount] = useState<number>(initialCount);
  function countAction(isAdd:boolean){
    if(isAdd){
      setCurrentCount(currentCount + countDiff);
      return;
    }
    
    if(currentCount - countDiff < 0){
      return;
    }
    setCurrentCount(currentCount - countDiff);
  }
  function resetAction(){
    setCurrentCount(initialCount);
  }
  return(
    <>
      <Display count={currentCount}/>
      <div>
        <CountButton countDiff={countDiff} isAdd={true} clickAction={()=>countAction(true)} />
        <CountButton countDiff={countDiff} isAdd={false} clickAction={()=>countAction(false)}/>
      </div>
      <div>
        <ResetButton clickAction={()=>resetAction()}/>
      </div>
    </>
  );
}