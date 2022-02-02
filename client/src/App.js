// Imports
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    createHttpLink,
} from '@apollo/client';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import components and pages
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="flex-column justify-flex-start min-100-vh">
                <Header />
                <div className="container">
                    <Home />
                </div>
                <Footer />
            </div>
        </ApolloProvider>
    );
}

export default App;
