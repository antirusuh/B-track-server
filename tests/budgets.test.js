const app = require("../app");
const request = require("supertest");
const { User, Budget, Department, sequelize } = require("../models");
const { queryInterface } = sequelize;
const { createToken } = require("../helpers/jsonwebtoken");

/*
- created db testing: sequelize --env test db:create
- migrate db testing: sequelize --env test db:migrate
- seeding data course: sequelize --env test db:seed:all
*/

let access_token,
  access_token2,
  access_token3,
  invalid_token,
  budgetDummy,
  departmentDummy;

const user = {
  username: "user",
  email: "user@mail.com",
  password: "abcde",
  role: "manager_finance",
  DepartmentId: "",
};

const user2 = {
  username: "user2",
  email: "user2@mail.com",
  password: "abcde",
  role: "manager_department",
  DepartmentId: "",
};

const user3 = {
  username: "user3",
  email: "user3@mail.com",
  password: "abcde",
  role: "manager_department",
  DepartmentId: "",
};

beforeAll((done) => {
  Department.create({ name: "Test" })
    .then((department) => {
      departmentDummy = department;
      user.DepartmentId = department.id;
      user2.DepartmentId = department.id;
      user3.DepartmentId = department.id;
      return User.create(user);
    })
    .then((user) => {
      access_token = createToken({ id: user.id, username: user.username });
      return User.create(user2);
    })
    .then((user2) => {
      access_token2 = createToken({ id: user2.id, username: user2.username });
      return User.create(user3);
    })
    .then((user3) => {
      access_token3 = createToken({ id: user3.id, username: user3.username });
      invalid_token = createToken({ id: 4567, username: "invalid_user" });
      return Budget.create({
        name: "Monthly Regular Budget",
        amount: 10000000,
        initial_amount: 10000000,
        date: new Date("1 January 2021"),
        due_date: new Date("1 February 2021"),
        status: "Approve",
        DepartmentId: departmentDummy.id,
      });
    })
    .then((budget) => {
      budgetDummy = budget;
      done();
    })
    .catch((err) => done(err));
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Departments", {})
    .then(() => {
      return queryInterface.bulkDelete("Users", {});
    })
    .then(() => {
      queryInterface.bulkDelete("Budgets", {});
      done();
    })
    .catch((err) => done(err));
});

describe("GET /budgets", () => {
  test("[SUCCESS] Should return array of object, status code 200", (done) => {
    request(app)
      .get("/budgets")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token invalid, status code 401", (done) => {
    request(app)
      .get("/budgets")
      .set("Accept", "application/json")
      .set("access_token", invalid_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token is undefined, status code 401", (done) => {
    request(app)
      .get("/budgets")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
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
      .get(`/budgets/department/${departmentDummy.id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token invalid, status code 401", (done) => {
    request(app)
      .get("/budgets/department/2")
      .set("Accept", "application/json")
      .set("access_token", invalid_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token undefined, status code 401", (done) => {
    request(app)
      .get("/budgets/department/2")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when params not found, status code 404", (done) => {
    request(app)
      .get("/budgets/department/100")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /budgets/:id", () => {
  test("[SUCCESS] Should return array of object, status code 200", (done) => {
    request(app)
      .get(`/budgets/${budgetDummy.id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token invalid, status code 401", (done) => {
    request(app)
      .get("/budgets/1")
      .set("Accept", "application/json")
      .set("access_token", invalid_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token undefined, status code 401", (done) => {
    request(app)
      .get("/budgets/1")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message, status code 404", (done) => {
    request(app)
      .get("/budgets/100")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", expect.any(String));
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
      date: new Date("1 January 2021"),
      due_date: new Date("1 February 2021"),
    };

    request(app)
      .post("/budgets")
      .set("Accept", "application/json")
      .set("access_token", access_token2)
      .send(data)
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("name", expect.any(String));
        expect(response.body).toHaveProperty("amount", expect.any(Number));
        expect(response.body).toHaveProperty(
          "initial_amount",
          expect.any(Number)
        );
        expect(response.body).toHaveProperty("date", expect.anything());
        expect(response.body).toHaveProperty("due_date", expect.anything());
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

  test("[FAILED] Should return error message when token invalid, status code 401", (done) => {
    request(app)
      .post("/budgets")
      .set("Accept", "application/json")
      .set("access_token", invalid_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token undefined, status code 401", (done) => {
    request(app)
      .post("/budgets")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when input invalid, status code 400", (done) => {
    request(app)
      .post("/budgets")
      .set("Accept", "application/json")
      .set("access_token", access_token2)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", expect.anything());
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when user unauthorized, status code 403", (done) => {
    request(app)
      .post("/budgets")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PUT /budgets/:id", () => {
  test("[SUCCESS] Should return object, status code 200", (done) => {
    const data = {
      amount: 8000000,
      initial_amount: 8000000,
      date: new Date("1 January 2021"),
      due_date: new Date("1 March 2021"),
      status: "Approved",
    };

    request(app)
      .put(`/budgets/${budgetDummy.id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send(data)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", expect.any(String));
        expect(response.body).toHaveProperty("amount", expect.any(Number));
        expect(response.body).toHaveProperty(
          "initial_amount",
          expect.any(Number)
        );
        expect(response.body).toHaveProperty("date", expect.anything());
        expect(response.body).toHaveProperty("due_date", expect.anything());
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

  test("[FAILED] Should return error message when token invalid, status code 401", (done) => {
    request(app)
      .put("/budgets/1")
      .set("Accept", "application/json")
      .set("access_token", invalid_token)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when token undefined, status code 401", (done) => {
    request(app)
      .put(`/budgets/${budgetDummy.id}`)
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when params not found, status code 404", (done) => {
    request(app)
      .put("/budgets/100")
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message when input invalid, status code 400", (done) => {
    request(app)
      .put(`/budgets/${budgetDummy.id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token)
      .send({ name: "" })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", expect.anything());
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
      .delete(`/budgets/${budgetDummy.id}`)
      .set("Accept", "application/json")
      .set("access_token", access_token3)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message, status code 401", (done) => {
    request(app)
      .delete(`/budgets/${budgetDummy.id}`)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[FAILED] Should return error message, status code 404", (done) => {
    request(app)
      .delete("/budgets/456677")
      .set("access_token", access_token2)
      .then((response) => {
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
