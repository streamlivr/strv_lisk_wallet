const { Mnemonic } = require('@liskhq/lisk-passphrase');
const { ed, address } = require('@liskhq/lisk-cryptography');
const express = require('express');
const { APIClient, transactions, cryptography } = require('@liskhq/lisk-client');
const app = express();

const port = process.env.PORT || 3000; // Use the specified port or default to 3000

app.use(express.json());

app.get('/', async (req, res) => {
  res.send("Hello World");
});

app.get('/createWallet', async (req, res) => {
  try {
    const credential = generateKeysAndAddress();
    res.send({ "success": true, "message": "Wallet created", "data": credential });
  } catch (error) {
    res.send({ "success": false, "message": "Error Creating Wallet", "data": error });
  }
});

app.post('/sendLSK', async (req, res) => {
  try {
    const { recipientAddress, amount, transactionData, senderPassphrase } = req.body;
    if (!recipientAddress || !amount || !senderPassphrase) {
      return res.status(400).json({ "success": false, "message": "Invalid input" });
    }

    const signedTransaction = await sendLisk(senderPassphrase, recipientAddress, amount, transactionData);

    res.send({ "success": true, "message": "LSK sent", "data": signedTransaction });
  } catch (error) {
    res.send({ "success": false, "message": "Error sending LSK", "data": error });
  }
});

app.post('/receiveLSK', async (req, res) => {
  try {
    const { signedTransaction } = req.body;
    if (!signedTransaction) {
      return res.status(400).json({ "success": false, "message": "Invalid input" });
    }

    const response = await receiveLisk(signedTransaction);

    res.send({ "success": true, "message": "LSK received", "data": response });
  } catch (error) {
    res.send({ "success": false, "message": "Error receiving LSK", "data": error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function generateKeysAndAddress() {
  const passphrase = Mnemonic.generateMnemonic(256);
  const privateKeyBuffer = ed.getPrivateKeyFromPassphrase(passphrase);
  const publicKeyBuffer = ed.getPublicKeyFromPrivateKey(privateKeyBuffer);
  const publicKey = publicKeyBuffer.toString('hex');
  const lisk32address = address.getAddressFromPublicKey(publicKeyBuffer);
  return {
    "Passphrase": passphrase,
    "PrivateKey": privateKeyBuffer.toString('hex'),
    "PublicKey": publicKey,
    "Lisk32Address": lisk32address,
  };
}

function sendLisk(senderPassphrase, recipientAddress, amount, transactionData = '') {
  const client = new APIClient(['https://service.lisk.com/rpc-v2']);
  const privateKey = cryptography.getPrivateAndPublicKeyFromPassphrase(senderPassphrase).privateKey.toString('hex');
  const transaction = transactions.transfer({
    amount: BigInt(transactions.convertLSKToBeddows(amount.toString())),
    recipientId: recipientAddress,
    data: transactionData,
    passphrase: senderPassphrase,
  });
  return client.transaction.send(transaction, privateKey);
}

async function receiveLisk(signedTransaction) {
  const client = new APIClient(['https://service.lisk.com/rpc-v2']);
  return client.transaction.receive(signedTransaction);
}
