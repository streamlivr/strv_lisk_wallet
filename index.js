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
    var credential = await generateKeysAndAddress();
    res.send({ "success": true, "message": "Wallet created", "data": credential });
  } catch (error) {
    res.send({ "success": false, "message": "Error Creating Wallet", "data": error });
  }
});

app.post('/sendLSK', async (req, res) => {
  try {
    const { recipientAddress, amount, transactionData } = req.body;
    if (!recipientAddress || !amount) {
      return res.status(400).json({ "success": false, "message": "Invalid input" });
    }

    const credential = await generateKeysAndAddress();
    const signedTransaction = await signLiskTransaction(credential.passphrase, recipientAddress, amount, transactionData);

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

    const client = new APIClient(['https://service.lisk.com/rpc-v2']); // Replace with your Lisk node's WebSocket URL
    const response = await client.transaction.receive(signedTransaction);

    res.send({ "success": true, "message": "LSK received", "data": response });
  } catch (error) {
    res.send({ "success": false, "message": "Error receiving LSK", "data": error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function generateKeysAndAddress() {
  const passphrase = Mnemonic.generateMnemonic(256);
  const privateKeyBuffer = await ed.getPrivateKeyFromPhraseAndPath(passphrase, `m/44'/134'/0'`);
  const privateKey = privateKeyBuffer.toString('hex');
  const publicKeyBuffer = ed.getPublicKeyFromPrivateKey(privateKeyBuffer);
  const publicKey = publicKeyBuffer.toString('hex');
  const lisk32address = address.getLisk32AddressFromPublicKey(publicKeyBuffer);
  return {
    "Passphrase": passphrase,
    "PrivateKey": privateKey,
    "PublicKey": publicKey,
    "Lisk32Address": lisk32address,
  };
}

async function signLiskTransaction(passphrase, recipientAddress, amount, data = '') {
  const client = new APIClient(['https://service.lisk.com/rpc-v2']); // Replace with your Lisk node's WebSocket URL
  const privateKey = cryptography.getPrivateAndPublicKeyFromPassphrase(passphrase).privateKey.toString('hex');
  const transaction = transactions.transfer({
    amount: BigInt(transactions.convertLSKToBeddows(amount.toString())),
    recipientId: recipientAddress,
    data,
    passphrase: passphrase,
  });
  const signedTransaction = await client.transaction.send(transaction, privateKey);
  return signedTransaction;
}
