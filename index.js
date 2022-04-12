const { ApolloServer } = require('apollo-server-express');
const {ApolloGateway} = require('@apollo/gateway')
const express = require("express");
const process = require('process');

const gateway = new ApolloGateway({
    serviceList: [
        // { name: 'profile', url: process.env.CCMS_GRAPHQL_ENDPOINT },
        { name: 'timeAndAttendance',
            url: 'http://' + process.env.TIME_AND_ATTENDANCE_BASE_URI + '/v1/graphql' },
    ],
    introspectionHeaders: {
        introspection: 'true'
    }
});

const server = new ApolloServer({ gateway, subscriptions:false, tracing:true });
const app = express();
const port = process.env.PORT || 4000;

server.applyMiddleware({ app, path: '/v1/graphql' })
app.listen(port, () =>
    console.log(`🚀 Gateway Service ready at port ` + port)
);
