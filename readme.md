# StrvLiskWallet Application

The StrvLiskWallet is a Node.js application that provides an interface to create Lisk wallets, send LSK, and receive LSK using the Lisk blockchain. This README provides a comprehensive guide to the application's features, how to use it, how to set it up, and additional information for contributors.

## Table of Contents
- [Features](#features)
- [Usage](#usage)
  - [Creating a Lisk Wallet](#creating-a-lisk-wallet)
  - [Sending LSK](#sending-lsk)
  - [Receiving LSK](#receiving-lsk)
- [Setting Up the Application](#setting-up-the-application)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Getting Support](#getting-support)
- [Acknowledgements](#acknowledgements)
- [Roadmap](#roadmap)

## Features
The StrvLiskWallet application offers the following features:
- Creation of Lisk wallets, including Lisk addresses, passphrases, private keys, and public keys.
- Sending LSK from one account to another.
- Receiving LSK by processing signed transactions.

## Usage
### Creating a Lisk Wallet
- **Endpoint**: `https://strvliskwallet.up.railway.app/createWallet`
- **HTTP Method**: GET
- **Description**: Generates a new Lisk wallet and returns the wallet credentials, including the passphrase, private key, public key, and Lisk32 address.

### Sending LSK
- **Endpoint**: `https://strvliskwallet.up.railway.app/sendLSK`
- **HTTP Method**: POST
- **Description**: Allows users to send LSK to another account. The request should include the recipient's address, the amount to send, transaction data (optional), and the sender's passphrase.

### Receiving LSK
- **Endpoint**: `https://strvliskwallet.up.railway.app/receiveLSK`
- **HTTP Method**: POST
- **Description**: Receives LSK by providing a signed transaction as input. The application processes the transaction and updates the recipient's balance.

## Setting Up the Application
To run the StrvLiskWallet application locally, you need to:
1. Clone this repository.
2. Install the required dependencies using `npm install`.
3. Start the server with `npm start`.

## Endpoints
Here's a summary of the available endpoints:
- `/createWallet`: Create a new Lisk wallet.
- `/sendLSK`: Send LSK from one account to another.
- `/receiveLSK`: Receive LSK by providing a signed transaction.

## Contributing
Contributions to this project are welcome. If you want to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure that the code is properly tested.
4. Create a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Getting Support
If you have questions or need support, please open an issue on the project's GitHub repository. We'll be happy to assist you.

## Acknowledgements
We would like to acknowledge the [Lisk](https://lisk.com/) team for their blockchain technology that powers this application.

## Roadmap
In the future, we plan to enhance the application with additional features, such as wallet management and improved security. You can check the project's GitHub repository for updates and our development roadmap.

---

**Note**: This README provides a comprehensive guide to the StrvLiskWallet application. For detailed information on how to use each endpoint and interact with the application, please refer to the documentation on GitHub.
