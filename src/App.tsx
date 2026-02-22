// src/App.ts

import { useState } from "react";
import { v4 as uuid } from "uuid";
type Name = {
  firstName:string;
  lastName:string;
}
type RegisteredName = Name&{id:string};

function DisplayError({errorMessage}:{errorMessage:string}){
  return <h2 style={{color:"red"}}>{errorMessage}</h2>
}
function FormName({firstName, lastName,changeFirstName, changeLastName, handleSubmit}:Name&{changeFirstName:(name:string)=>void;changeLastName:(name:string)=>void;handleSubmit:(event:React.SubmitEvent<HTMLFormElement>)=>void}){
  return(
    <form onSubmit={(event)=>handleSubmit(event)}>
      <input id="firstName" type="text" value={firstName} onChange={(event)=>changeFirstName(event.target.value)}  placeholder="first name"/>
      <input id="lastName" type="text" value={lastName} onChange={(event)=>changeLastName(event.target.value)}  placeholder="last name"/>
      <button type="submit">表示</button>
    </form>
  );
}
function DisplayNames({registeredNames, handleDelete}:{registeredNames:RegisteredName[]; handleDelete:(targetId:string)=>void}){
  return(
    <ul>
      {registeredNames.map(name=><li key={name.id}>{`${name.firstName} ${name.lastName}`}<button onClick={()=>handleDelete(name.id)}>削除</button></li>)}
    </ul>
  );
}

export default function NameApp(){
  const [name, setName] = useState<Name>({firstName:"", lastName:""})
  const [registeredNames, setRegisteredNames] = useState<RegisteredName[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  function handleSubmit(event:React.SubmitEvent<HTMLFormElement>){
    event.preventDefault();
    if(name.firstName.length === 0 || name.lastName.length === 0){
      setErrorMessage("入力が不適切です");
      return;
    }
    setErrorMessage("");
    const newRegisteredNames = [...registeredNames, {id:uuid(), firstName:name.firstName, lastName:name.lastName}];
    setRegisteredNames(newRegisteredNames);
    setName({firstName:"", lastName:""});
  }
  function changeFirstName(newFirstName:string){
    const newName:Name = {...name, firstName:newFirstName};
    setName(newName);
  }
  function changeLastName(newLastName:string){
    const newName:Name = {...name, lastName:newLastName};
    setName(newName);
  }
  function handleDelete(targetId:string){
    const deletedNames = registeredNames.filter(name => name.id !== targetId);
    setRegisteredNames(deletedNames);
  }
  return(
    <>
      <DisplayError errorMessage={errorMessage}/>
      <FormName firstName={name.firstName} lastName={name.lastName} handleSubmit={handleSubmit} changeFirstName={changeFirstName} changeLastName={changeLastName}/>
      <DisplayNames registeredNames={registeredNames} handleDelete={handleDelete}/>
    </>
  );
}