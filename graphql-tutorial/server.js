const { ApolloServer, gql } = require("apollo-server");

let people = [
    {
        name: "Addy",
        age: 23,
        status: false,
        avatar: "",
        id: "1",
        categoryId: "1"
    },
    {
        name: "Ana",
        age: 30,
        status: true,
        avatar: "",
        id: "2",
        categoryId: "2"
    },
    {
        name: "Tommy",
        age: 26,
        status: true,
        avatar: "",
        id: "3",
        categoryId: "3"
    },
    {
        name: "Sam",
        age: 41,
        status: false,
        avatar: "",
        id: "4",
        categoryId: "4"
    }
]

const categories = [
    {
        id: "1",
        sex: "male"
    },
    {
        id: "2",
        sex: "female"
    },
    {
        id: "3",
        sex: "male"
    },
    {
        id: "4",
        sex: "female"
    },
]

const typeDefs = gql`
    type Query {
        hello: [String!]
        people: [Person!]
        person(id: ID!): Person
        categories: [Category!]
        category(id: ID!): Category
    }

    type Person {
        id: ID!
        name: String!
        age: Int!
        status: Boolean!
        avatar: String!
    }

    type Category {
        id: ID!
        sex: String!
        people: [Person!]
    }
`

const resolvers = {
    Query: {
        hello: () => ["Hello World!", "My", "Good", "Friend"],
        people: () => people,
        person: (_, {id}, context ) => {
            return people.find((person) => person.id === id);
        },
        categories: () => categories,
        category: (parent, {id}, context) => {
            return categories.find((category) => category.id === id)
        }
    },
    Category: {
        people: (parent, args, context) => {
            console.log(parent)
            const categoryId = parent.id;
            return people.filter(person => person.categoryId === categoryId)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({port})=>{
    console.log(`Started server on ${port}`);
})