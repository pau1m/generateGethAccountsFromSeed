const Web3 = require('web3')
const net = require('net')

// **** Add your IPC path here *****
let ipcPath = '/Users/x/.rinkeby/geth.ipc'
let web3 = new Web3(ipcPath, net)

web3.eth.getAccounts((err, accounts) => {
  if (!err) {
    // Unlock all geth accounts. 
    for (let i = 0; i < accounts.length; i++) {
      web3.eth.personal.unlockAccount(accounts[i], '', 999999, (err, res) => {
        if (!err) {
          console.log('unlocked: ' + accounts[i], res)
        } else {
          console.log(err)
        }
      })
    }
  } else {
    console.log('Unable to fetch account list: ', err)
  }
})