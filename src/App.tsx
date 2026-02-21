// src/App.tsx

import { useState } from "react";
type IsCorrect = boolean|null
function AnswerMessage({isCorrect}:{isCorrect:IsCorrect}){
  if(isCorrect === null){
    return <p>答えを選んでね</p>
  }
  return <p>{isCorrect ? "正解!" : "不正解..."}</p>
}
type AnswerButtonProps = {
  answer:string;
  clickAction:()=>void;
}
function AnswerButton({answer, clickAction}:AnswerButtonProps){
  return <button onClick={clickAction}>{answer}</button>
}
type ResetButtonProps = {
  clickAction:()=>void;
}
function ResetButton({clickAction}:ResetButtonProps){
  return <button onClick={clickAction}>リセット</button>
}
export default function QuizGame(){
  const [isCorrect, setIsCorrect] = useState<IsCorrect>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("?");
  function initializeQuiz(){
    setIsCorrect(null);
    setSelectedAnswer("?");
  }
  function checkAnswer(answer:string){
    setSelectedAnswer(answer);
    if(answer === "5"){
      setIsCorrect(true);
    }
    else{
      setIsCorrect(false);
    }
  }
  return(
    <>
      <p>2 + 3 = {selectedAnswer}</p>
      <AnswerMessage isCorrect={isCorrect}/>
      <AnswerButton clickAction={()=>checkAnswer("4")} answer="4"/>
      <AnswerButton clickAction={()=>checkAnswer("5")} answer="5"/>
      {isCorrect !== null ? <ResetButton clickAction={()=>initializeQuiz()}/> : ""}
    </>
  );
}