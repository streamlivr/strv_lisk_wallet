const {
	Mnemonic
} = require('@liskhq/lisk-passphrase');
const {
	ed,
	address
} = require('@liskhq/lisk-cryptography');
const express = require('express');
const {
	apiClient,
	transactions,
	cryptography
} = require('@liskhq/lisk-client');
const app = express();

const port = process.env.PORT || 3000; // Use the specified port or default to 3000
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.get('/', async (req, res) => {
	res.send("Hello World");
});

app.get('/createWallet', async (req, res) => {
	try {
		var credential = await generateKeysAndAddress();
		res.send({
			"success": true,
			"message": "Wallet created",
			"data": credential
		});
	} catch (error) {
		res.send({
			"success": false,
			"message": "Error Creating Wallet",
			"data": error
		});
	}
});

app.get('/sendLSK', (req, res) => {
	res.send(`
<form action="/sendLSK" method="post">
  <label for="recipientAddress">Recipient Address:</label>
  <input type="text" id="recipientAddress" name="recipientAddress"><br><br>
  <label for="amount">Amount:</label>
  <input type="text" id="amount" name="amount"><br><br>
  <label for="transactionData">Transaction Data:</label>
  <input type="text" id="transactionData" name="transactionData"><br><br>
  <label for="passphrase">passphrase:</label>
  <input type="text" id="passphrase" name="passphrase"><br><br>
  <input type="submit" value="Send LSK">
</form>
  `);
});

app.post('/sendLSK', async (req, res) => {
	try {
		const {
			recipientAddress,
			amount,
			transactionData,
			passphrase
		} = req.body;
		console.log('Request Body:', req.body); // Log the request body
		if (!recipientAddress || !amount) {
			return res.status(400).json({
				"success": false,
				"message": "Invalid input"
			});
		}

		const privateKey = await cryptography.ed.getPrivateKeyFromPhraseAndPath(passphrase, "m/44'/134'/0'");
		const client = await apiClient.createWSClient('wss://testnet-api.lemii.dev/rpc-ws');

		const signedTx = await client.transaction.create({
			module: 'token',
			command: 'transfer',
			fee: BigInt(transactions.convertLSKToBeddows('0.06')),
			params: {
				tokenID: Buffer.from('0100000000000000', 'hex'),
				amount: BigInt(transactions.convertLSKToBeddows(amount)),
				recipientAddress,
				data: transactionData
			}
		}, privateKey);

		const response = await client.transaction.send(signedTx);
		res.send({
			"success": true,
			"message": "LSK sent",
			"data": response
		});
	} catch (error) {
		res.send({
			"success": false,
			"message": "Error sending LSK",
			"data": error
		});
	}
});

app.post('/receiveLSK', async (req, res) => {
	try {
		const {
			signedTransaction
		} = req.body;
		if (!signedTransaction) {
			return res.status(400).json({
				"success": false,
				"message": "Invalid input"
			});
		}

		const client = new APIClient(['wss://testnet-api.lemii.dev/rpc-ws']); // Replace with your Lisk node's WebSocket URL
		const response = await client.transaction.receive(signedTransaction);

		res.send({
			"success": true,
			"message": "LSK received",
			"data": response
		});
	} catch (error) {
		res.send({
			"success": false,
			"message": "Error receiving LSK",
			"data": error
		});
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

async function generateKeysAndAddress() {
	const passphrase = Mnemonic.generateMnemonic(256);
	const privateKeyBuffer = await ed.getPrivateKeyFromPhraseAndPath(passphrase, "m/44'/134'/0'");
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
