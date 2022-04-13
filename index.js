const { ApolloServer } = require('apollo-server-express');
const {ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource} = require('@apollo/gateway')
const express = require("express");
const process = require('process');

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            {
                name: "timeAndAttendance",
                url: "http://" + process.env.TIME_AND_ATTENDANCE_BASE_URI + "/v1/graphql"
            }
        ],
        introspectionHeaders: {
            introspection: 'true'
        }
    }),
    buildService({ name, url }) {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
                request.http?.headers.set('hc-country', context.country);
                request.http?.headers.set('hc-origincustomerid', context.originCustomerId);
                request.http?.headers.set('hc-origincontactid', context.originContactId);
            },
        });
    }
});

const server = new ApolloServer({
    gateway,
    subscriptions:false,
    tracing:true,
    context: ({ req }) => {
        const country = req.headers['hc-country'];
        const originCustomerId = req.headers['hc-origincustomerid'];
        const originContactId = req.headers['hc-origincontactid'];
        return { country, originCustomerId, originContactId };
    },
});

const app = express();
const port = process.env.PORT || 8080;

server.applyMiddleware({ app, path: '/v1/graphql' })
app.listen(port, () =>
    console.log(`🚀 Gateway Service ready at port ` + port)
);
