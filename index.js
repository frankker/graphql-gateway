const { ApolloServer, gql } = require('apollo-server');
const {ApolloGateway} = require('@apollo/gateway')
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
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(
      `Try your health check at: ${url}.well-known/apollo/server-health`,
    );
  });
