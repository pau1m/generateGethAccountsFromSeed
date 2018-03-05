const Web3 = require('web3')
const net = require('net')

// **** Add your own IPC path here *****
let ipcPath = ''
// **** Add your own Mnemonic here *****
let mnemonic = ''
// Set to m/44'/60'/0' for ledger nano s hardware wallet compatibilty
let wallet_hdpath = "m/44'/60'/0'/0/"

let web3 = new Web3(ipcPath, net)

let bip39 = require('bip39')
let hdkey = require('ethereumjs-wallet/hdkey')
let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))


// Generate 10 accounts and add to Geth.
// Does not preserve index in derivation path - just adds them to Geth. 
for (let i = 0; i < 10; i++) {
  let wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet()
  web3.eth.personal.importRawKey(wallet.getPrivateKey().toString('hex'), '', (err, res) => {
    if (!err) {
      console.log('Created account: ', res)
    } else {
      console.log(err)
    }
  })
}
