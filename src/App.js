import './App.css';
import { useState, useEffect } from 'react';
import { utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { useEthers, useEtherBalance, useSendTransaction, useTokenBalance } from '@usedapp/core'
import { formatEther, formatUnits } from '@ethersproject/units'

function App() {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const [userAccount, setUserAccount] = useState()
  const [disabled, setDisabled] = useState(true);
  const [address, setAddress] = useState("0x69a91Bfb0E44C1DD153f71FF75A359E8f70f9060");// this is fixed address
  const [amountEth, setAmountEth] = useState();
  const [amountBnb, setAmountBnb] = useState();
  const etherBalance = useEtherBalance(account)
  const { sendTransaction, state } = useSendTransaction()
  const BNB = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52' // BNB token address fixed value
  const tokenBalance = useTokenBalance(BNB, account)
  const connectWallet = () => {
    activateBrowserWallet()
  }
  const handleClick = () => {
    setDisabled(true)
    sendTransaction({ chainId:3, to: address, value: utils.parseEther(amountEth) })
    console.log("eth", amountEth);
  }
  const handleClickBnb = () => {
    setDisabled(true)
    sendTransaction({ chainId:97, to: address, value: utils.parseEther(amountBnb) })
  }
  useEffect(() => {
    if (state.status != 'Mining') {
      setDisabled(false)
      setAmountEth("0")
      setAmountBnb("0")
      setAddress("0x69a91Bfb0E44C1DD153f71FF75A359E8f70f9060") // reset destination address
    }
  }, [state])
  return (
    <div className="App">
      <header className="App-header">
        <div style={{color : 'white'}}>
          {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
          {/* {tokenBalance && <p>Balance_BSC: {formatUnits(tokenBalance, 18)}BNB</p>} */}
          {account && <p>From: {account}</p>}
          {account && <p>To: {address}</p>}
        </div>
        {!account && <button className="btn btn-success" style={{width:200, height:100, fontSize:30}} onClick={activateBrowserWallet}> Connect </button>}
        {account && (
          <div>
            <button onClick={deactivate} className="btn btn-success" style={{width:200, height:100, fontSize:30}}> Disconnect </button>
          </div>
        )}
        {account && (
          <div className="flex flex-row mt-4">
            <input
                className="myInput"
                name='text'
                type="text"
                width="120"
                height="50"
                placeholder='0.0'
                value={amountEth}
                onChange={(e) => setAmountEth(e.target.value)}
                required
            />
            <button className="btn btn-success my-1 ml-4" style={{ width: 200, height: 100, fontSize: 30 }} onClick={handleClick}>Ethereum</button>
          </div>
          )}
        {account && (
          <div className="flex flex-row mt-4">
            <input
                className="myInput"
                name='text'
                type="text"
                placeholder='0.0'
                value={amountBnb}
                onChange={(e) => setAmountBnb(e.target.value)}
                required
            />
            <button className="btn btn-success my-1 ml-4" style={{ width: 200, height: 100, fontSize: 30 }} onClick={handleClickBnb}>BNB</button>
          </div>
          )}
        <div>{userAccount}</div>
      </header>
    </div>
  );
}

export default App;
