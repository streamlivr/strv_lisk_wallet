# StrvLiskWallet

**StrvLiskWallet** is a Node.js application designed to interact with the Lisk blockchain. It provides essential functionalities for creating Lisk wallets, sending Lisk (LSK) to other users, and receiving LSK through signed transactions. This repository includes the source code for the application.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
  - [Creating a Lisk Wallet](#creating-a-lisk-wallet)
  - [Sending Lisk (LSK)](#sending-lisk-lsk)
  - [Receiving Lisk (LSK)](#receiving-lisk-lsk)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Acknowledgements](#acknowledgements)

## Introduction

Lisk is a blockchain platform that enables the development and execution of decentralized applications. StrvLiskWallet simplifies interactions with the Lisk blockchain by offering convenient web-based endpoints. Developers and users can create wallets, send LSK tokens, and receive LSK tokens without dealing with the intricacies of the Lisk ecosystem.

## Features

**StrvLiskWallet** offers the following features:

- **Create Lisk Wallet**: Generate a new Lisk wallet with a unique passphrase, private key, public key, and Lisk32 address.
- **Send LSK**: Initiate LSK transactions to another user by specifying the recipient's address, the amount, and optional transaction data.
- **Receive LSK**: Verify and process incoming signed transactions to update the recipient's LSK balance.

## Usage

### Creating a Lisk Wallet

- **Endpoint**: `/createWallet`
- **HTTP Method**: GET
- **Description**: Generates a new Lisk wallet and returns the wallet credentials, including the passphrase, private key, public key, and Lisk32 address.

### Sending Lisk (LSK)

- **Endpoint**: `/sendLSK`
- **HTTP Method**: POST
- **Description**: Allows users to send LSK to another account. The request should include the recipient's address, the amount to send, transaction data (optional), and the sender's passphrase.

### Receiving Lisk (LSK)

- **Endpoint**: `/receiveLSK`
- **HTTP Method**: POST
- **Description**: Receives LSK by providing a signed transaction as input. The application processes the transaction and updates the recipient's balance.

## Getting Started

To run the StrvLiskWallet application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Start the server with `npm start`.

## API Endpoints

Here are the available API endpoints:

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

## Support

If you have questions or need support, please open an issue on the project's GitHub repository. We'll be happy to assist you.

## Acknowledgements

We would like to acknowledge the [Lisk](https://lisk.com/) team for their blockchain technology that powers this application.

---
**Note**: Detailed documentation for API usage is available in the project's GitHub repository.

