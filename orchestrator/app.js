const { ApolloServer, ApolloError, UserInputError } = require('apollo-server');
const mainServer = require('./apis/mainServer');
const typeDefs = require('./schema');


const user = {
  id: 45,
  DepartmentId: 1,
  email: 'mail@mail.com',
  username: 'Dummy User',
  role: 'manager',
  access_token: 'ajkhdqeojansd$%jkahd56'
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    user() {
      return user
    }
  },
  Mutation: {
    async login(_, { payload }) {
      try {
        const { data: user } = await mainServer({
          method: 'POST',
          url: '/login',
          data: payload
        })

        return user
      } catch ({ response: { data } }) {
        throw new UserInputError(data.message)
      }
    },
    async register(_, { payload }) {
      try {
        // console.log(payload);
        const {data: newUser} = await mainServer({
          method: 'POST',
          url: '/register',
          data: payload
        })
        console.log(newUser);
        return newUser
      } catch ({ response: { data } }) {
        throw new UserInputError(data.message)
      }
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});