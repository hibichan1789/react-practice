// src/App.tsx

import { useState } from "react";

function DisplayName({name}:{name:string}){
  return <h1>{name}</h1>
}
function InputForm({currentText, handleText}:{currentText:string; handleText:(inputValue:string)=>void}){
  return(
    <div>
      <label htmlFor="input-name">名前: </label>
      <input type="text" value={currentText} id="input-name" onChange={(event)=>handleText(event.target.value)}/>
    </div>
  );
}
function UpperButton({handleClick}:{handleClick:()=>void}){
  return <button onClick={handleClick}>大文字にする</button>
}
export default function NameApp(){
  const [currentText, setCurrentText] = useState<string>("");
  const isLong = currentText.length >= 10;
  function handleInput(text:string){
    setCurrentText(text);
  }
  function handleToUpper(){
    const textUpperCase = currentText.toUpperCase();
    setCurrentText(textUpperCase);
  }
  return(
    <>
      <DisplayName name={currentText}/>
      <InputForm currentText={currentText} handleText={handleInput}/>
      <UpperButton handleClick={handleToUpper}/>
      {currentText.length === 0 ? <p>名前を入力してください</p> : ""}
      {isLong ? <p style={{color:"red"}}>文字が長すぎます</p> : ""}
    </>
  );
}