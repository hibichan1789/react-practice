// src/App.tsx

import { useState } from "react";

type ProductItemProps = {
  name:string;
  count:number;
}
function ProductItem({name, count}:ProductItemProps){
  return(<span>{name} {count}個</span>);
}
type CountButtonProps = {
  isAdd:boolean;
  clickAction:()=>void;
}
function CountButton({isAdd, clickAction}:CountButtonProps){
  return <button onClick={clickAction}>{isAdd ? "+" : "-"}</button>
}
type Product = {
  name:string;
  count:number;
}
const products:Product[] = [
  {name:"リンゴ", count: 10},
  {name:"バナナ", count: 8}
]
export default function ShoppingCart(){
  const [productItems, setProductItems] = useState(products.map(product => product));
  function clickCount(targetName:string, isAdd:boolean){
    const newProductItem = productItems.map(item =>{
      if(item.name !== targetName){
        return item;
      }
      if(isAdd){
        return {...item, count:item.count + 10};
      }
      return {...item, count:item.count === 0 ? item.count : item.count - 10};
    });
    setProductItems(newProductItem);
  }
  return(
    <>
    {productItems.map(item => {
    return(
      <div key={item.name}>
        <CountButton isAdd={true} clickAction={()=>clickCount(item.name, true)}/>
        <ProductItem  name={item.name} count={item.count}/>
        <CountButton isAdd={false} clickAction={()=>clickCount(item.name, false)}/>
      </div>
    );
    })}
    <div>
          <p>合計: {productItems.reduce((sum, item)=>sum + item.count, 0)}</p>
    </div>
    </>
  )
}