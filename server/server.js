// Imports
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

// Declarations
const PORT = process.env.PORT || 3001;
const app = express();

// Set up the server
const startServer = async () => {
    // Set up Apollo server with schema data
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleware,
    });
    // Start the Apollo server
    await server.start();
    // Integrate Apollo server with Express app as middleware
    server.applyMiddleware({ app });
    // Log where we can test GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
