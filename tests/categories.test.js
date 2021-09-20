const app = require("../app");
const request = require("supertest");
const { Department, User, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { createToken } = require("../helpers/jsonwebtoken");

let access_token;

let userData = {
  username: "usertest",
  email: "usertest@mail.com",
  password: "12345",
  role: "staff",
  DepartmentId: "",
};

beforeAll((done) => {
  Department.create({ name: "Test" })
    .then((department) => {
      userData.DepartmentId = department.id;
      return User.create(userData);
    })
    .then((user) => {
      access_token = createToken({ id: user.id, email: user.email });
      done();
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Departments", {})
    .then(() => {
      return queryInterface.bulkDelete("Users", {});
    })
    .then(() => {
      queryInterface.bulkDelete("Categories", {});
      done();
    })
    .catch((err) => done(err));
});

describe("Category Route Test", () => {
  describe("GET /categories", () => {
    test("200 Success get categories", (done) => {
      request(app)
        .get("/categories")
        .set("Accept", "application/json")
        .set("access_token", access_token)
        .then((res) => {
          const { body, status } = res;
          expect(status).toBe(200);
          expect(Array.isArray(body)).toBeTruthy();
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 without token", (done) => {
      request(app)
        .get("/categories")
        .set("Accept", "application/json")
        .then((res) => {
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });
  });
});
