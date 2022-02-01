// Import the GQL tagged template function
const { gql } = require('apollo-server-express');

// Create type definitions
const typeDefs = gql`
    type Query {
        helloWorld: String
    }
`;

// Export type definitions
module.exports = typeDefs;
