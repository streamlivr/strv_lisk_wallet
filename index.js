const { Mnemonic } = require('@liskhq/lisk-passphrase');
const { ed, address } = require('@liskhq/lisk-cryptography');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000; // Use the specified port or default to 3000

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
