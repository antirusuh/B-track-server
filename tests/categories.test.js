const request = require("supertest");
const {
  test,
  describe,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");

const app = require("../app");
const { User, Department, sequelize } = require("../models");
const { createToken } = require("../helpers/jsonwebtoken");

const { queryInterface } = sequelize;
const userDataTest = {
  username: "user_test",
  email: "sampleUser@mail.com",
  password: "samplepassword",
  role: "someRole",
  DepartmentId: null,
};
const departmentInput = {
  name: "Finance",
};
let access_token;

beforeAll((done) => {
  queryInterface
    .bulkInsert("Categories", [
      {
        name: "Category 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Category 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Category 3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .then(() => {
      return Department.create(departmentInput);
    })
    .then((result) => {
      userDataTest.DepartmentId = result.id;
      return User.create(userDataTest);
    })
    .then((user) => {
      access_token = createToken({ id: user.id, username: user.username });
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Categories", {})
    .then(() => {
      return queryInterface.bulkDelete("Users", {});
    })
    .then(() => {
      return queryInterface.bulkDelete("Departments", {});
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /categories [SUCCESS CASE]", () => {
  test("should return array of object with id and name | Status code 200", (done) => {
    request(app)
      .get("/categories")
      .set("access_token", access_token)
      .set("Accept", "application/json")
      .then(({ status, body }) => {
        expect(status).toBe(200);
        expect(body).toHaveLength(3);
        expect(body[0]).toHaveProperty("id", expect.any(Number));
        expect(body[0]).toHaveProperty("name", expect.any(String));
        // expect(body).toHaveProperty('id', expect.any(Number))
        // expect(body).toHaveProperty('name', expect.any(String))
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
