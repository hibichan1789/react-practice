// src/App.tsx
import { useState } from "react";

type Color = "青"|"黄"|"赤"
function Light({color}:{color:Color}){
  return <p>今の色は{color}色です</p>
}
type SwitchLight = {
  color:Color;
  clickAction:()=>void;
}
function SwitchButton({color, clickAction}:SwitchLight){
  return(
    <div>
      <button value={color} onClick={clickAction}>{color}にする</button>
    </div>
  );
}
export default function TrafficSignal(){
  const [currentColor, setCurrentColor] = useState<Color>("青");
  function switchAction(color:Color){
    setCurrentColor(color);
  }
  const colors:Color[] = ["青", "黄", "赤"];
  return(
    <>
    <Light color={currentColor}/>
    {colors.map(color=> <SwitchButton key={color} color={color} clickAction={()=>switchAction(color)}/>)}
    </>
  )
}