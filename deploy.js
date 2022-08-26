/* Compile And Push To Eth Network */
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

/** ENTER YOUR INFORMATION HERE! **/
const mnemonic = '<a94afd8bc5954d429d19f8ba8f2c1240>';     /* YOUR SEED PHRASE ... */
const providerOrUrl = '<https://ropsten.infura.io/v3/a94afd8bc5954d429d19f8ba8f2c1240>' /* RINKEBY ENDPOINT */

const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
const web3 = new Web3(provider);

   /* PATH TO SOLIDITY SMART CONTRACT */
const content = fs.readFileSync('./MyContract.sol', 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'MyContract': { content }
    },
    settings: {
      outputSelection: { '*': { '*': ['*'] } }
    }
  };



// **DEPLOYMENT START HERE**  

  async function deploy (){
    console.log("Deploying Smart Contract!");
    /* 1. Get Ethereum Account */
    const [account] = await web3.eth.getAccounts();
  
    /* 2. Compile Smart Contract */
    const {contracts} = JSON.parse(
      solc.compile(JSON.stringify(input))
    );
  
    const contract = contracts['MyContract'].MyContract;
  
    /* 2. Extract Abi And Bytecode From Contract */
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;
  
    /* 3. Send Smart Contract To Blockchain */
    const { _address } = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({from: account, gas: 1000000 });
  
    console.log("Contract Address =>", _address);
  };
  
  deploy();
