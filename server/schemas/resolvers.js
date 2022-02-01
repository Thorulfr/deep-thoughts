// Imports
const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        // Find all thoughts (by a specific user, if specified)
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // Find one thought by ID
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // Find all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // Find one user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
    },
};

module.exports = resolvers;
