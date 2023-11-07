<h1>Lisk Wallet Creation API</h1>
<p>Welcome to the Lisk Wallet Creation API - a live, production-ready service for generating Lisk wallets. This API is built using Node.js and leverages the power of the @liskhq/lisk-passphrase and @liskhq/lisk-cryptography libraries, along with the popular Express framework for creating robust web applications.</p>
<p>This is a Node.js application that provides a simple API for creating Lisk wallets using the <a href="https://github.com/LiskHQ/lisk-passphrase">@liskhq/lisk-passphrase</a>, <a href="https://github.com/LiskHQ/lisk-cryptography">@liskhq/lisk-cryptography</a> and <a href="https://expressjs.com/">Express.</a></p><br>
<br>
<h2>Features</h2><br>
<ul>
   <li>Generate a random mnemonic passphrase.</li>
   <li>Derive a Lisk wallet's private key and public key from the passphrase.</li>
   <li>Compute the Lisk32 address from the public key.</li>
   <li>Expose endpoints to create Lisk wallets using a RESTful API.</li>
</ul>

<br>
<h2>Overview
</h2>
<p>This API offers an easy and secure way to create Lisk wallets, complete with mnemonic passphrases, private keys, public keys, and Lisk32 addresses. Whether you're a developer building a Lisk-based application or an enthusiast looking to create your Lisk wallet, this API simplifies the process.

</p>

<br>

<h2>Prerequisites</h2>
<p>Before you can run this application, ensure that you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from <a href="https://nodejs.org/en">nodejs.org.</a></p>

<br>
<h2>Installation</h2>
<ol>
   <li>Clone this repository to your local machine:</li>
   ```sh
git clone https://github.com/streamlivr/strv_lisk_wallet.git
cd strv_lisk_wallet

   ```
<li>Install the required dependencies using npm:</li>
```sh
npm install
```
</ol>

<br>
<h2>Configuration</h2>
<br>
<p>You can configure the application by modifying the port variable in the code. By default, the server will listen on port 3000. You can also customize other aspects of the code according to your requirements.</p>

<br>

<h2>Usage</h2>
<p>Start the application by running:</p>
```sh
npm start
```
<p>The server will start, and you can access the following endpoints:</p>

<ul>
   <li>'GET /': Returns a simple "Hello World" message.</li>
   <li>'GET /createWallet': Generates a Lisk wallet and returns the generated credentials, including the mnemonic passphrase, private key, public key, and Lisk32 address.</li>
</ul>
<h2>Example</h2>
<p>Here's an example of how to use the 'GET /createWallet' endpoint:</p>
```sh
curl http://localhost:3000/createWallet

```
```sh
curl https://strvliskwallet.up.railway.app/createWallet
```

<h2>Accessing the Live API</h2>
<p>You can access the live API here: <a href="https://strvliskwallet.up.railway.app/createWallet">Lisk Wallet Creation API</a></p>

<h2>Response</h2>
<p>A successful response will look like this:</p>

```sh
{
  "success": true,
  "message": "Wallet created",
  "data": {
    "Passphrase": "your-random-mnemonic-passphrase",
    "PrivateKey": "your-private-key",
    "PublicKey": "your-public-key",
    "Lisk32Address": "your-lisk32-address"
  }
}

```
<p>If any error occurs during wallet creation, you will receive an error response.</p>

<h2>Customization</h2>
<p>You can easily customize the API according to your requirements. Feel free to adjust the code to suit your specific needs, whether it's integrating the API into your project or expanding its functionality.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a>LICENSE</a> file for details.

</p>
<h2>Authors</h2>
<ul>Your Name <a href="gideongabriel557@gmail.com">Gideon Ganriel</a></ul>

<h2>Acknowledgement</h2>

<p>We would like to express our gratitude to the Lisk team for their remarkable development tools and resources that make projects like this possible.</p>
<p>Enjoy the convenience and security of generating Lisk wallets with this live Lisk Wallet Creation API!</p>
