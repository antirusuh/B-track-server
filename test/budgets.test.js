const app = require("../app");
const request = require("supertest");
const { Budget, User, Transaction } = require("../models");
const jwt = require("jsonwebtoken");

describe("GET /budgets", () => {
  test("[SUCCESS] Should return array of object, status code 200", (done) => {
    request(app)
      .get("/budgets")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /budgets/department/:id", () => {
  test("[SUCCESS] Should return array of object, status code 200", (done) => {
    request(app)
      .get("/budgets/department/1")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /budgets/:id", () => {
  test("[SUCCESS] Should return object, status code 200", (done) => {
    request(app)
      .get("/budgets/1")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", expect.any(String));
        expect(response.body).toHaveProperty("amount", expect.any(Number));
        expect(response.body).toHaveProperty("request_date", expect.any(Date));
        expect(response.body).toHaveProperty(
          "initial_amount",
          expect.any(Number)
        );
        expect(response.body).toHaveProperty("due_date", expect.any(Date));
        expect(response.body).toHaveProperty("status", expect.any(String));
        expect(response.body).toHaveProperty(
          "DepartmentId",
          expect.any(Number)
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /budgets", () => {
  test("[SUCCESS] Should return object, status code 201", (done) => {
    const data = {
      name: "Monthly Regular Budget",
      amount: 10000000,
      initial_amount: 10000000,
      request_date: new Date("1 January 2021"),
      due_date: new Date("1 February 2021"),
      status: "Unapproved",
      DepartmentId: 1,
    };

    request(app)
      .post("/budgets")
      .set("access_token", access_token)
      .set("manager department", role)
      .send(data)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("name", "Monthly Regular Budget");
        expect(response.body).toHaveProperty("amount", 10000000);
        expect(response.body).toHaveProperty("initial_amount", 10000000);
        expect(response.body).toHaveProperty("request_date", expect.any(Date));
        expect(response.body).toHaveProperty("due_date", expect.any(Date));
        expect(response.body).toHaveProperty("status", "Unapproved");
        expect(response.body).toHaveProperty("DepartmentId", 1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /budgets/:id", () => {
  test("[SUCCESS] Should return object, status code 204", (done) => {
    const data = {
      name: "Monthly Regular Budget",
      amount: 8000000,
      initial_amount: 8000000,
      request_date: new Date("1 January 2021"),
      due_date: new Date("1 March 2021"),
      status: "Approved",
      DepartmentId: 1,
    };

    request(app)
      .put("/budgets/1")
      .set("access_token", access_token)
      .set("manager finance", role)
      .send(data)
      .then((response) => {
        expect(response.status).toBe(204);
        expect(response.body).toHaveProperty("name", "Monthly Regular Budget");
        expect(response.body).toHaveProperty("amount", 8000000);
        expect(response.body).toHaveProperty("initial_amount", 8000000);
        expect(response.body).toHaveProperty("request_date", expect.any(Date));
        expect(response.body).toHaveProperty("due_date", expect.any(Date));
        expect(response.body).toHaveProperty("status", "Approved");
        expect(response.body).toHaveProperty("DepartmentId", 1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /budgets/:id", () => {
  test("[SUCCESS] Should return success message, status code 200", (done) => {
    request(app)
      .delete("/budgets/1")
      .set("access_token", access_token)
      .set("manager", role)
      .then((response) => {
        expect(response.status).toBe(204);
        expect(response.body).toHaveProperty(
          "message",
          "Budget successfully deleted"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
