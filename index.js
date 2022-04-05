const { ApolloServer, gql } = require('apollo-server');
const {ApolloGateway} = require('@apollo/gateway')
const process = require('process');

const gateway = new ApolloGateway({
    serviceList: [
        // { name: 'profile', url: process.env.CCMS_GRAPHQL_ENDPOINT },
        { name: 'timeAndAttendance', url: process.env.WFM_TNA_GRAPHQL_ENDPOINT },
    ]
});

const server = new ApolloServer({ gateway, subscriptions:false, tracing:true });
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(
      `Try your health check at: ${url}.well-known/apollo/server-health`,
    );
  });
