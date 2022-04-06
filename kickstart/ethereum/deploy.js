const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

//Deployed at 0xA509dB2D24B6B60337cA3c180b6DA47e900CfC91

const provider = new HDWalletProvider(
    'indicate paddle humble toilet immense famous asset during mansion flee tunnel cash',
    'https://rinkeby.infura.io/v3/f9dc0ac429e344b6836a2f6212543802'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
