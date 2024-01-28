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

4. Create a `.env` file in the root directory of your project. You can use the provided [`.env.example`](.env.example) as a template.

Copy the contents of `.env.example` into the `.env` file

```sh
cp .env.example .env
```
or replace the placeholder values with your actual values.

## Running Tests

This project uses Jest for testing. To run the tests, use the following command:

```sh
yarn test
```

## Running the Application with Docker

```sh
yarn up
```

Once the application is running, you can fetch the endpoint at `http://localhost:4000/api/fees-collected` with the tools of your choice. For example, you can use curl:

```sh
curl http://localhost:4000/api/fees-collected
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
