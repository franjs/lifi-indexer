# Working with Events

## LI.FI indexer

An application that stores `FeesCollected` events emitted by `FeesCollected` smart contract on any EVM chain.

## LI.FI API

A REST api to fetch the data indexed.

Endpoints:

```
GET /api/fees-collected
```

## Installation

Before you start, make sure you have Node.js, Yarn, and Docker installed on your machine.

1. Clone the repository:

```sh
git clone https://github.com/franjs/lifi-indexer.git
```

2. Navigate to the project directory:

```sh
cd lifi-indexer
```

3. Install dependencies:

```sh
yarn install
```

## Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```sh
yarn test
```

## Running the Application with Docker

```sh
yarn up
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
