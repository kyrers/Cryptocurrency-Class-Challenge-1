//IMPORTS
import { ethers } from 'ethers';
import { useState } from 'react';
import { targetNetwork, contractAddress } from './config/Config';
import UpdatableHelloWorldArtifact from "./artifacts/contracts/UpdatableHelloWorld.sol/UpdatableHelloWorld.json"
import { Button } from 'react-bootstrap';
import './App.css';
//-----

//CONSTS
const provider = new ethers.providers.StaticJsonRpcProvider(targetNetwork.rpcUrl);
const signer = provider.getSigner();
const UpdatableHelloWorldContract = new ethers.Contract(contractAddress, UpdatableHelloWorldArtifact.abi, signer);
//-----

function App() {
  const [message, setMessage] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState();
  const [userMessage, setUserMessage] = useState();
  const [searchAddress, setSearchAddress] = useState("");
  const [searchMessageIndex, setSearchMessageIndex] = useState(0);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function latestMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const transaction = await UpdatableHelloWorldContract.getLatestMessage();
      const receipt = await transaction.wait();
      console.log("TRANSACTION", transaction);
      console.log("RECEIPT", receipt);
      setUser(receipt.events[0].args[0]);
      setMessage(receipt.events[0].args[1]);
    }
  }

  async function updateMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const transaction = await UpdatableHelloWorldContract.updateMessage(newMessage);
      const receipt = await transaction.wait();
      console.log("TRANSACTION", transaction);
      console.log("RECEIPT", receipt);
    }
  }

  async function getUserMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      setUserMessage(undefined);
      const message = await UpdatableHelloWorldContract.getUserMessage(searchAddress, searchMessageIndex);
      setUserMessage(message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Updatable Hello World</h1>
      </header>

      <hr />

      <div>
        <div className="margin-bottom-20">
          {
            message !== undefined && user !== undefined ?
              <div>
                <span>{message}</span>
                <br />
                <span>by</span>
                <br />
                <span>{user}</span>
              </div>
              :
              null
          }
        </div>
        <div>
          <Button variant="primary" onClick={latestMessage}>See the latest message</Button>
        </div>
      </div>

      <hr />

      <div>
        <div className="custom-input">
          <input type="text" placeholder='New message' className="form-control" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setNewMessage(e.target.value)} />
        </div>
        <div>
          <Button variant="primary" onClick={updateMessage}>Update message</Button>
        </div>
      </div>

      <hr />

      <div>
        <div className='margin-bottom-20'>
          {
            userMessage !== undefined ?
              <span className="margin-bottom-20">{userMessage}</span>
              :
              null
          }
        </div>
        <div className="custom-input">
          <input type="text" placeholder='User address' className="form-control" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setSearchAddress(e.target.value)} />
        </div>
        <br />
        <div className="custom-input">
          <input type="number" placeholder='Message index' className="form-control" aria-describedby="inputGroup-sizing-sm" onChange={(e) => setSearchMessageIndex(parseInt(e.target.value))} />
        </div>
        <div>
          <Button variant="primary" onClick={getUserMessage}>Get user message</Button>
        </div>
      </div>

    </div>
  );
}

export default App;
