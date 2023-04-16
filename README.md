# Poster Ordering Backend

This project is a Node.js backend application for an e-commerce app that allows users to order starmap, coordinates map, and city map posters.

## Getting Started

To run this application locally, you'll need to have Node.js and NPM installed on your machine. You'll also need to set up a MongoDB database to store poster orders.

1. Clone this repository to your local machine.
2. Run `npm install` to install all dependencies.
3. Set up a MongoDB database and create a `.env` file with the following environment variables:
    MONGO_URL=<your MongoDB host URL>
    JWT_SECRET=<your jwt secret>
    STRIPE_SECRET=<stripe secret key>

4. Run `npm start` to start the server.

The server will run on `http://localhost:5000` by default.
