// src/App.tsx

import { useState } from "react";

function TempDisplay({temperature, currentOperation}:{temperature:number; currentOperation:Operation}){
  const message = getTempMessage(temperature);
  const style = getDisplayStyle(currentOperation);
  return(
    <div style={style}>
      <p>現在の温度: {temperature} ℃</p>
      <p>{message}</p>
    </div>
  );
}
function getDisplayStyle(operation:Operation){
  if(operation === "heating"){
    return {backgroundColor:"rgb(191, 56, 56)"};
  }
  else if(operation === "cooling"){
    return {backgroundColor:"rgba(149, 204, 255, 1)"};
  }
  return {backgroundColor:"rgba(202, 229, 205, 1)"}
}
function getTempMessage(temperature:number){
  const isHot = temperature >= 30;
  const isCold = temperature <= 10;
  const isComfortable = !isHot && !isCold;
  const message = isComfortable ? "快適です" : (isHot ? "暑すぎます" : "寒すぎます");
  return message;
}
function ChangeTemperatureButton({isWarm, handleClick}:{isWarm:boolean, handleClick:(isWarm:boolean)=>void}){
  return <button onClick={()=>handleClick(isWarm)}>{isWarm ? "+" : "-"}</button>
}
function ChangeTemplateTemperature({name, temperature, handleClick}:TemplateTemperature&{handleClick:(temperature:number)=>void}){
  return <button onClick={()=>handleClick(temperature)}>{name}: {temperature}℃</button>
}
function ChangeOperation({operation, handleClick}:{operation:Operation; handleClick:(operation:Operation)=>void}){
  return <button onClick={()=>handleClick(operation)}>{operation}</button>
}
type Operation = "heating"|"cooling"|"blower";
const INITIAL_TEMPERATURE = 20;
type TemplateTemperature = {
  name:string;
  temperature:number;
}
const templateTemperatures:TemplateTemperature[] = [
  {name:"お風呂", temperature:40},
  {name:"サウナ", temperature:90},
  {name:"氷水", temperature:0}
]
export default function ThermostatApp(){
  const [currentTemperature, setCurrentTemperature] = useState<number>(INITIAL_TEMPERATURE);
  const [currentOperation, setCurrentOperation] = useState<Operation>("blower");
  function handleTemperature(isWarm:boolean){
    if(isWarm){
      setCurrentTemperature(currentTemperature + 1);
    }
    else{
      setCurrentTemperature(currentTemperature - 1);
    }
  }
  function handleTemplateTemperature(temperature:number){
    setCurrentTemperature(temperature);
  }
  function handleOperation(operation:Operation){
    setCurrentOperation(operation);
  }
  return(
    <>
      <TempDisplay temperature={currentTemperature} currentOperation={currentOperation}/>
      <div>
        <ChangeTemperatureButton isWarm={true} handleClick={handleTemperature}/>
        <ChangeTemperatureButton isWarm={false} handleClick={handleTemperature}/>
      </div>
      <div>
        {templateTemperatures.map(item => <ChangeTemplateTemperature key={item.name} name={item.name} temperature={item.temperature} handleClick={handleTemplateTemperature}/>)}
      </div>
      <div>
        <ChangeOperation handleClick={handleOperation} operation="heating"/>
        <ChangeOperation handleClick={handleOperation} operation="cooling"/>
        <ChangeOperation handleClick={handleOperation} operation="blower"/>
      </div>
    </>
  );
}