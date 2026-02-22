// src/App.ts

import { useState } from "react";
import { v4 as uuid4 } from "uuid";
function FormTodo({currentText, handleChange, handleSubmit}:{currentText:string;handleChange:(text:string)=>void;handleSubmit:(text:string)=>void}){
  return(
    <div>
      <input type="text" value={currentText} onChange={(event)=>handleChange(event.target.value)}/>
      <button type="button" disabled={currentText.length === 0} onClick={()=>handleSubmit(currentText)}>追加</button>
    </div>
  );
}
function DisplayTodo({todos, handleDelete}:{todos:Todo[]; handleDelete:(targetId:string)=>void}){
  return(
    <ul>
      {todos.map(todo=> <li key={todo.id}>{todo.name}<button type="button" onClick={()=>handleDelete(todo.id)}>削除</button></li>)}
    </ul>
  );
}

type Todo = {
  id:string;
  name:string;
}
export default function TodoApp(){
  const [currentText, setCurrentText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleChange(text:string){
    setCurrentText(text);
  }
  function handleSubmit(text:string){
    const newTodo = {id:uuid4(), name:text};
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setCurrentText("");
  }
  function handleDelete(targetId:string){
    const deletedTodos = todos.filter(todo => todo.id !== targetId);
    setTodos(deletedTodos);
  }
  return(
    <>
      <FormTodo currentText={currentText} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <DisplayTodo todos={todos} handleDelete={handleDelete}/>
    </>
  );
}