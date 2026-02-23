// src/App.ts

import {useState } from "react";
import { v4 as uuid } from "uuid";
type Memo = {
  id:string;
  title:string;
  description:string;
  category:Category;
}
type InputMemo = Omit<Memo, "id">
type MemoFormProps = InputMemo&{
  changeInput:(event:React.ChangeEvent<HTMLInputElement, HTMLInputElement>)=>void;
  changeSelect:(selectedCategory:Category)=>void;
  submitForm:(event:React.SubmitEvent<HTMLFormElement>)=>void;
}
type Category = "Work"|"Personal"|"Other";
const categories:Category[] = ["Work", "Personal", "Other"];
function MemoForm({title, description, category, changeInput, changeSelect, submitForm}:MemoFormProps){
  return(
    <form onSubmit={(event)=>submitForm(event)}>
      <div>
        <label htmlFor="input-title">Title: </label>
        <input type="text" id="input-title" value={title} onChange={(event)=>changeInput(event)}/>
      </div>
      <div>
        <label htmlFor="input-description">Description: </label>
        <input type="text" id="input-description" value={description} onChange={(event)=>changeInput(event)}/>
      </div>
      <div>
        <label>Category: 
          <select value={category} onChange={(event)=>changeSelect(event.target.value as Category)}>
            {categories.map(category => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
      </div>
      <button type="submit">追加</button>
    </form>
  );
}
type MemoListProps = {
  memos:Memo[];
  filteredCategory:FilteredCategory;
}
type FilteredCategory = Category|"All";

function MemoList({memos, filteredCategory}:MemoListProps){
  const filteredMemos = filteredCategory === "All" ? memos : memos.filter(memo=>memo.category === filteredCategory);
  return(
    <table>
      <thead>
        <tr>
          <th>Title</th><th>Description</th><th>Category</th>
        </tr>
      </thead>
      <tbody>
        {filteredMemos.map(memo =>{
          return(
            <tr key={memo.id}>
              <td>{memo.title}</td><td>{memo.description}</td><td>{memo.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const filteredCategories:FilteredCategory[] = ["All", ...categories];
function FilterSelectList({currentCriteria, changeSelectCriteria}:{currentCriteria:FilteredCategory, changeSelectCriteria:(category:FilteredCategory)=>void}){
  return(
    <div>
      <label>
        Filter By Category: 
        <select value={currentCriteria} onChange={(event)=>changeSelectCriteria(event.target.value as FilteredCategory)}>
          {filteredCategories.map(category=><option key={category}>{category}</option>)}
        </select>
      </label>
    </div>
  );
}
const initialInputMemo:InputMemo = {title:"", description:"", category:"Work"}
export default function MemoApp(){
  const [inputMemo, setInputMemo] = useState<InputMemo>(initialInputMemo);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [currentCriteria, setCurrentCriteria] = useState<FilteredCategory>("All");
  function submitForm(event:React.SubmitEvent<HTMLFormElement>){
    event.preventDefault();
    if(inputMemo.description.trim() === "" || inputMemo.title.trim() === ""){
      return;
    }
    const newMemos:Memo[] = [...memos, {id:uuid(), title:inputMemo.title, description:inputMemo.description, category:inputMemo.category}]
    setMemos(newMemos);
    setInputMemo(initialInputMemo);
  }
  function changeInput(event:React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
    const target = event.target;
    if(target.id === "input-title"){
      const newMemo:InputMemo = {...inputMemo, title:target.value.trim()};
      setInputMemo(newMemo);
      return;
    }
    if(target.id === "input-description"){
      const newMemo:InputMemo = {...inputMemo, description:target.value.trim()};
      setInputMemo(newMemo);
      return;
    }
  }
  function changeSelect(selectedCategory:Category){
    const newMemo:InputMemo = {...inputMemo, category:selectedCategory};
    setInputMemo(newMemo);
  }
  function changeSelectCriteria(selectedCategory:FilteredCategory){
    setCurrentCriteria(selectedCategory);
  }
  
  return(
    <>
      <header><h1>メモアプリ</h1></header>
      <main>
        <MemoForm title={inputMemo.title} description={inputMemo.description} category={inputMemo.category} changeInput={changeInput} changeSelect={changeSelect} submitForm={submitForm}/>
        <FilterSelectList currentCriteria={currentCriteria} changeSelectCriteria={changeSelectCriteria}/>
        <MemoList memos={memos} filteredCategory={currentCriteria}/>
      </main>
      <footer>
        <p>&copy; hibichan1789</p>
      </footer>
    </>
  );
}