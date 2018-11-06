const functions = require('firebase-functions');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const firestore = require('./firestore');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    addresses(): [Address]
    address(id: String!): Address
  }
  type Address {
      lat: Float,
      lng: Float,
      ward: String,
      country: String,
      city: String,
      district: String,
      street: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    address: ({ id }) => firestore.get(id).then(val => val),
    addresses: () => firestore.getAll().then(val => val)
};

const app = express();

app.use(cors());
app.options('*', cors());
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		rootValue: root,
		graphiql: true
	})
);

const api = functions.https.onRequest(app);

module.exports = {
	api
};

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
