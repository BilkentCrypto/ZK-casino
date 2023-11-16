import './App.css';
import RouletteGame from './components/RouletteGame';
import Wallet from './components/Wallet';
import Games from './components/Games';
import React, { useEffect, useMemo } from 'react';
import { Grid } from '@mui/material';
import contractsService from './services/contractsService';
import {useDispatch, useSelector } from "react-redux";
import { loadAccounts } from './reducers/accountReducer';
import { loadBalance } from './reducers/balanceReducer';
import { loadPrice } from './reducers/priceReducer';
import { loadHistorial } from './reducers/historialReducer';
import BuyTokens from './components/BuyTokens';
import WithdrawTokens from './components/Withdraw';
import Header from './components/Header';
import {
  Routes,
  Route,
} from "react-router-dom"

import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");



const App = () => {

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );
  const dispatch = useDispatch()
  const balance = useSelector(({ balance }) => {
    return balance;
  });
  const account = useSelector(({ account }) => {
    return (
      account
    )
  })

  const price = useSelector(({ price }) => {
    return price;
  });

  // const web3Handler = async () => {
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //   dispatch(loadAccounts(accounts[0]));
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();

  //   window.ethereum.on('chainChanged', (chainId) => {
  //     window.location.reload();
  //   })

  //   window.ethereum.on('accountsChanged', async function (accounts) {
  //     dispatch(loadAccounts(accounts[0]));
  //     await web3Handler();
  //   })
  //   await contractsService.loadContracts(signer);
  // }

  const loadInfo = async () => {
    if (account !==""){
      await dispatch(loadBalance(account));
      await dispatch(loadPrice(account));
      await dispatch(loadHistorial(account))
    }
  }

  useEffect(() => {
    loadInfo()
}, [account])


  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet}
      autoConnect
    >
     <WalletModalProvider>
        <Grid container rowSpacing={{ xs: 8, sm: 9 }} sx={{ width: 1, backgroundColor: '#222c31'}}>
        <Grid item xs={12}>
          <Header balance={balance} account={account}/>
        </Grid>
        <Grid item xs={12}>
          <Routes>
            <Route path="/Wallet" element={<Wallet/>} > 
              <Route path="buyTokens" element={<BuyTokens account={account} price={price} />} />
              <Route path="withdrawTokens" element={<WithdrawTokens balance={balance} account={account} price={price}/>} />
            </Route>
            <Route path="/games" element={<Games/>}/>
            <Route path="/games/Roulette" element={<RouletteGame balance={balance} account={account} />} />
          </Routes>
          </Grid>
          </Grid>
      </WalletModalProvider>
  </WalletProvider>
  );
}

export default App;
