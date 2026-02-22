// src/App.tsx

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
type Product = {
  name:string;
  price:number;
}
type TotalPriceProps = {
  price:number;
  priceTaxIncluded:number;
}
function DisplayTotalPrice({price, priceTaxIncluded}:TotalPriceProps){
  return <p>小計: {formatPrice(price)} (税込み:{formatPrice(priceTaxIncluded)})</p>
}
function ProductByButton({name, price, handleClick}:Product&{handleClick:()=>void}){
  return <button onClick={handleClick}>{name} {price}</button>
}
function DisplayLogs({logs, handleDelete}:{logs:ProductLog[], handleDelete:(id:string)=>void}){
  return(
    <ul>
      {logs.map(log=><li key={log.id}>{log.name} {formatPrice(log.price)}<button onClick={()=>handleDelete(log.id)}>削除</button></li>)}
    </ul>
  );
}
const products:Product[] = [
  {name:"リンゴ", price:150},
  {name:"バナナ", price:100},
  {name:"ミカン", price:80}
]
type ProductLog = Product&{id:string};
const TAX = 1.1;
export default function ShoppingApp(){
  const [productLogs, setProductLogs] = useState<ProductLog[]>([]);
  const currentTotal = productLogs.reduce((total, log)=> total + log.price, 0);
  function handleBuy(name:string, price:number){
    const newLogs:ProductLog[] = [...productLogs, {id:uuidv4(), name, price}]
    setProductLogs(newLogs);
  }
  function handleReset(){
    setProductLogs([]);
  }
  function handleDelete(id:string){
    const deletedLogs = productLogs.filter(log => log.id !== id);
    setProductLogs(deletedLogs);
  }
  const priceTaxIncluded = calculateTaxIncluded(currentTotal);
  return(
    <>
      <DisplayTotalPrice price={currentTotal} priceTaxIncluded={priceTaxIncluded}/>
      <div>
        {products.map((product, productIndex)=><ProductByButton key={productIndex} name={product.name} price={product.price} handleClick={()=>handleBuy(product.name, product.price)} />)}
        <button onClick={handleReset}>リセット</button>
      </div>
      <DisplayLogs logs={productLogs} handleDelete={handleDelete}/>
    </>
  );
}

// utils関数
function calculateTaxIncluded(price:number):number{
  return Math.floor(price * TAX);
}
function formatPrice(price:number):string{
  return price.toLocaleString("ja-JP", {
    style:"currency",
    currency:"JPY"
  })
}