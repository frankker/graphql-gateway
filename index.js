const { ApolloServer, gql } = require('apollo-server');
const {ApolloGateway} = require('@apollo/gateway')

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'profile', url: process.env.CCMS_GRAPHQL_ENDPOINT },
        { name: 'timeAndAttendance', url: process.env.WFM_TA_GRAPHQL_ENDPOINT },
    ]
});

const server = new ApolloServer({ gateway, subscriptions:false, tracing:true });
server.listen();
