// src/App.tsx

import { useState } from "react";

function TemperatureDisplay({temperature}:{temperature:number}){
  return(
    <>
      <p>今の温度は{temperature}℃です</p>
      {temperature >= 30 ? <p>熱いです</p>: <p>快適です</p>}
    </>
  );
}
type SetTemperatureButtonProp = {
  degree:number;
  isRaise:boolean;
  clickAction:()=>void;
}
function SetTemperatureButton({degree, isRaise, clickAction}:SetTemperatureButtonProp){
  return <button onClick={clickAction}>温度を{degree}℃{isRaise ? "上げる" : "下げる"}</button>
}
const initialTemperature = 20
const degree = 5;
export default function WeatherStation(){
  const [currentTemperature, SetCurrentTemperature] = useState<number>(initialTemperature);
  function clickSetTemperature(isRaise:boolean){
    if(isRaise){
      SetCurrentTemperature(currentTemperature + degree);
    }
    else{
      SetCurrentTemperature(currentTemperature - degree);
    }
  }
  return(
    <>
      <TemperatureDisplay temperature={currentTemperature}/>
      <SetTemperatureButton clickAction={()=>clickSetTemperature(true)} degree={degree} isRaise={true}/>
      <SetTemperatureButton clickAction={()=>clickSetTemperature(false)} degree={degree} isRaise={false}/>
    </>
  );
}