import { useState } from 'react'
import { ethers } from "ethers";

import './App.css'

import PranshuCoin from "./contract/PranshuCoin.json";

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = PranshuCoin.abi;

const App = () => {

  const [wallet, setWallet] = useState("");
  const [pc, setPc] = useState(null);
  const [balance, setBalance] = useState("");

  async function connectWallet(){
    const accounts = await window.ethereum.request({
      method : "eth_requestAccounts",
    });
    setWallet(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const pcContract = new ethers.Contract(
      address, 
      abi,
      signer
    );
    setPc(pcContract);
  }

  async function getBalance(){
    if(!pc){
      alert("Connect wallet first");
      return;
    }

    const bal = await pc.balanceOf(wallet);
    setBalance(ethers.formatEther(bal));
  }

  return (
   <>
     <h1>Pranshu Coin</h1>

     <h4>wallet: {wallet? wallet : "Not connected"} </h4>
     <button onClick={connectWallet} >Connect Wallet</button>

     <button onClick={getBalance}>Check Balance</button>
     <div>Your balance : {balance} </div>
   </>
  )
}

export default App
