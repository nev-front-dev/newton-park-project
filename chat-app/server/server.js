const { GraphQLServer, PubSub } = require("graphql-yoga");

let messages = []

// ===== schema =====>
const typeDefs = `
    type Message {
        id: ID!
        user: String!
        content: String!
    }
    type Query {
        messages: [Message]!
    }
    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }
    type Subscription {
        messages: [Message]!
    }
`;

const resolvers = {
    Query: {
        messages: () => messages
    },
    Mutation: {
        postMessage:(_, {user, content}) => {
            const id = messages.length + 1
            messages.push({id, user, content})
            return id;
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(({ port }) => {
  console.log(`Server satrted on port ${port}`);
});
