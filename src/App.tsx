// src/App.ts

import { useState } from "react";
import { v4 as uuid } from "uuid";
type TodoInputProps = {
  inputTodo:string;
  onInputTodo:(input:string)=>void;
  submitTodo:(event:React.SubmitEvent<HTMLFormElement>)=>void;
}
type Todo = {
  id:string;
  name:string;
}
function TodoInput({inputTodo, onInputTodo, submitTodo}:TodoInputProps){
  return(
    <form onSubmit={(event)=>submitTodo(event)}>
      <label htmlFor="input-todo">Todo: </label>
      <input type="text" id="input-todo" value={inputTodo} onChange={(event)=>onInputTodo(event.target.value)}/>
      <button type="submit" disabled={inputTodo.length === 0}>追加</button>
    </form>
  );
}
type DisplayTodoProps = {
  todos:Todo[];
  onDelete:(targetId:string)=>void;
}
type DeleteButtonProps = Pick<DisplayTodoProps, "onDelete"> & {id:string};
function DeleteButton({id, onDelete}: DeleteButtonProps){
  return <button onClick={()=>onDelete(id)} type="button">削除</button>
}
function DisplayTodo({todos, onDelete}:DisplayTodoProps){
  if(todos.length === 0){
    return <p>なにも追加されていません</p>
  }
  return(
    <ul>
      {todos.map(todo => <li key={todo.id}>{todo.name}<DeleteButton onDelete={onDelete} id={todo.id}/></li>)}
    </ul>
  );
}
export default function TodoApp(){
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputTodo, setInputTodo] = useState<string>("");
  function onInputTodo(input:string){
    setInputTodo(input);
  }
  function submitTodo(event:React.SubmitEvent<HTMLFormElement>){
    event.preventDefault();
    if(inputTodo.length === 0){
      return;
    }
    const newTodos = [...todos, {id:uuid(), name:inputTodo}];
    setTodos(newTodos);
    setInputTodo("");
  }
  function onDelete(targetId:string){
    const deletedTodos = todos.filter(todo => todo.id !== targetId);
    setTodos(deletedTodos);
  }
  return(
    <>
      <TodoInput inputTodo={inputTodo} onInputTodo={onInputTodo} submitTodo={submitTodo}/>
      <DisplayTodo todos={todos} onDelete={onDelete}/>
    </>
  );
}