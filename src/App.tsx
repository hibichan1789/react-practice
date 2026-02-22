import { useState } from "react";

// src/App.tsx
type Assets = {
  cash:number;
  stock:number;
  investmentTrust:number;
}
type DisplayAssetProps = Assets & {totalAssets:number}

function DisplayMoney({cash, stock, investmentTrust, totalAssets}:DisplayAssetProps){
  return(
    <>
      <ul>
        <li>CASH: {formatMoney(cash)}</li>
        <li>STOCK: {formatMoney(stock)}</li>
        <li>INVESTMENT TRUST: {formatMoney(investmentTrust)}</li>
      </ul>
      <p>TOTAL MONEY: {formatMoney(totalAssets)}</p>
    </>
  );
}
function BuyButton({transactionAmount, cash, isStock, handleClick}:{transactionAmount:number, cash:number, isStock:boolean, handleClick:()=>void}){
  return <button disabled={transactionAmount > cash} onClick={handleClick}>買う ({isStock? "株式" : "投資信託"} +{formatMoney(transactionAmount)}, 現金 -{formatMoney(transactionAmount)})</button>
}
function SalaryButton({salaryAmount, handleClick}:{salaryAmount:number, handleClick:()=>void}){
  return <button onClick={handleClick}>給料日(現金+ {formatMoney(salaryAmount)})</button>
}
function DisplayLogs({logs}:{logs:string[]}){
  return(
    <ul>
      {logs.map((log, logIndex) => <li key={logIndex}>{log}</li>)}
    </ul>
  );
}

const initialAssets:Assets = {
  cash:100000,
  stock:700000,
  investmentTrust:200000,
}
const transactionAmount = 5*10**3;
const salaryAmount = 5*10**3;
export default function AssetsApp(){
  const [currentAssets, setCurrentAssets] = useState<Assets>(initialAssets);
  const [logs, setLogs] = useState<string[]>([]);
  const totalAssets:number = Object.values(currentAssets).reduce((total, money)=>total+money, 0);
  function handleBuyClick(isStock:boolean){
    if(isStock){
      setCurrentAssets({...currentAssets, cash:currentAssets.cash - transactionAmount, stock:currentAssets.stock + transactionAmount})
      const newLog = `株式を${formatMoney(transactionAmount)}買いました (${formatMoney(totalAssets)})`;
      const newLogs = [...logs, newLog];
      setLogs(newLogs);
    }
    else{
      setCurrentAssets({...currentAssets, cash:currentAssets.cash - transactionAmount, investmentTrust:currentAssets.investmentTrust + transactionAmount})
      const newLog = `投資信託を${formatMoney(transactionAmount)}買いました (${formatMoney(totalAssets)})`;
      const newLogs = [...logs, newLog];
      setLogs(newLogs);
    }
  }
  function handleSalaryClick(){
    setCurrentAssets({...currentAssets, cash:currentAssets.cash + salaryAmount});
    const newLog = `給料から${formatMoney(transactionAmount)}証券口座に入れました (${formatMoney(totalAssets)})`;
    const newLogs = [...logs, newLog];
    setLogs(newLogs);
  }
  return(
    <>
      <DisplayMoney cash={currentAssets.cash} stock={currentAssets.stock} investmentTrust={currentAssets.investmentTrust} totalAssets={totalAssets}/>
      <BuyButton transactionAmount={transactionAmount} cash={currentAssets.cash} isStock={true} handleClick={()=>handleBuyClick(true)}/>
      <BuyButton transactionAmount={transactionAmount} cash={currentAssets.cash} isStock={false} handleClick={()=>handleBuyClick(false)}/>
      <SalaryButton salaryAmount={salaryAmount} handleClick={()=>handleSalaryClick()}/>
      {checkCurrentCash(currentAssets.cash, totalAssets) ? <p style={{color:"green"}}>OK:キャッシュを維持できています</p> : <p style={{color:"red"}}>NG:現金比率が危険です</p>}
      <DisplayLogs logs={logs}/>
    </>
  );
}

// utils関数
function formatMoney(money:number){
  return money.toLocaleString("ja-JP", {
    style:"currency",
    currency: "JPY"
  })
}
function checkCurrentCash(cash:number, totalAssets:number):boolean{
  const isSafe = cash/totalAssets >= 0.10;
  return isSafe;
}