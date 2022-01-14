const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    await apolloServer.start();

    // apolloServer.applyMiddleware({ app: app, path: '/truly' });
    apolloServer.applyMiddleware({ app: app });

    app.use((req, res) => {
        res.send("Hello from express apollo server");
    })

    await mongoose.connect('mongodb+srv://user:user123@cluster001.n4vq0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    
    console.log('Mongoose connected ...');

    app.listen(4000, () => console.log("Server in running on port 4000"));
}

startServer();