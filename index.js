const { Mnemonic } = require('@liskhq/lisk-passphrase');
const { ed, address } = require('@liskhq/lisk-cryptography');

async function generateKeysAndAddress() {
  const passphrase = Mnemonic.generateMnemonic(256);
  const privateKeyBuffer = await ed.getPrivateKeyFromPhraseAndPath(passphrase, `m/44'/134'/0'`);
  const privateKey = privateKeyBuffer.toString('hex');
  const publicKeyBuffer = ed.getPublicKeyFromPrivateKey(privateKeyBuffer);
  const publicKey = publicKeyBuffer.toString('hex');
  const lisk32address = address.getLisk32AddressFromPublicKey(publicKeyBuffer);

  console.log('Passphrase:', passphrase);
  console.log('Private Key:', privateKey);
  console.log('Public Key:', publicKey);
  console.log('Lisk32 Address:', lisk32address);
}

generateKeysAndAddress();