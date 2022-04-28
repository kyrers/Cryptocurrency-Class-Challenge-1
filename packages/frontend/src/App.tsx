//IMPORTS
import { JsonRpcSigner } from '@ethersproject/providers';
import { useEffect, useState } from 'react';
import { targetNetwork } from './config/Config';
import { Button } from 'react-bootstrap';
import { connect } from './hooks/connect';
import { loadContract } from './hooks/loadContract';
import './App.css';
//-----

function App() {
  const [userSigner, setUserSigner] = useState<JsonRpcSigner | null>();
  const [connectedWallet, setConnectedWallet] = useState("");
  const [message, setMessage] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState();
  const [userMessage, setUserMessage] = useState();
  const [searchAddress, setSearchAddress] = useState("");
  const [searchMessageIndex, setSearchMessageIndex] = useState(0);

  //Connect user wallet
  useEffect(() => {
    async function promptConnect() {
      const { signer, signerAddress } = await connect();
      setUserSigner(signer);
      setConnectedWallet(signerAddress);
      //latestMessage();
    }
    promptConnect();
  }, []);

  //Listen to wallet changes
  window.ethereum.on('accountsChanged', () => {
    window.location.reload();
  });

  //Load contract using user account
  const updatableHelloWorldContract = loadContract(userSigner);

  //Listen to LatestMessage event
  /*updatableHelloWorldContract.on("LatestMessage", (address, message) => {
    setMessage(message);
    setUser(address);
  });*/

  //Get the latest message
  async function latestMessage() {
    const output = await updatableHelloWorldContract.getLatestMessage();
    setMessage(output[0]);
    setUser(output[1]);
  }

  //Update the current message
  async function updateMessage() {
    await updatableHelloWorldContract.updateMessage(newMessage);
  }

  //Get a specific user message
  async function getUserMessage() {
    setUserMessage(undefined);
    const message = await updatableHelloWorldContract.getUserMessage(searchAddress, searchMessageIndex);
    setUserMessage(message);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Updatable Hello World</h1>
        <h5 className="header-target-network">{targetNetwork.name}</h5>
        <Button onClick={connect}>
          {
            connectedWallet !== "" ?
              <span>{connectedWallet}</span>
              :
              <span>Connect</span>
          }
        </Button>
      </header>

      <hr />

      <div>
        <div className="margin-bottom-20">
          {
            message !== undefined && user !== undefined ?
              <div>
                <span><b>{message}</b></span>
                <br />
                <span>by</span>
                <br />
                <span><b>{user}</b></span>
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
