const { gql } = require('apollo-server');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type User {
    id: Int
    DepartmentId: Int
    email: String
    username: String
    role: String
    access_token: String
  }

  type Budget {
    id: Int
    amount: Int
    date: String
    initial_amount: Int
    due_date: String
    status: String
    DepartmentId: Int
  }

  type Transaction {
    id: Int
    name: String
    date: String
    amount: Int
    img_invoice: String
    CategoryId: Int
    BudgetId: Int
    UserId: Int
  }

  input Register {
    username: String
    email: String
    password: String
    role: String
    DepartmentId: Int
  }

  input Login {
    email: String
    password: String
  }

  type Query {
    user: User
  }

  type Mutation {
    login (payload: Login) : User
    register (payload: Register) : User
  }
`;

module.exports = typeDefs