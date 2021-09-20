const app = require("../app");
const request = require("supertest");
const { User, Budget } = require("../models");
const { createToken } = require("../helpers/jsonwebtoken");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

/*
- created db testing: sequelize --env test db:create
- migrate db testing: sequelize --env test db:migrate
- seeding data course: sequelize --env test db:seed:all
*/

let access_token, access_token2, invalid_token;

const user = {
  username: "user",
  email: "user@mail.com",
  password: "abcde",
  role: "manager_finance",
  DepartmentId: 1,
};

const user2 = {
  username: "user2",
  email: "user2@mail.com",
  password: "abcde",
  role: "manager_department",
  DepartmentId: 2,
};

beforeAll((done) => {
  User.create(user)
    .then((user) => {
      access_token = createToken({ id: user.id, username: user.username });
      return User.create(user2);
    })
    .then((user2) => {
      access_token2 = createToken({ id: user2.id, username: user2.username });
      invalid_token = createToken({ id: 4567, username: "invalid_user" });
      done();
    })
    .catch((err) => done(err));
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Users", {})
    .then(() => done())
    .catch((err) => done(err));
});

describe("GET /budgets", () => {
  test("[SUCCESS] Should return array of object, status code 200", (done) => {
    request(app)
      .get("/budgets")
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
      .get("/budgets/department/2")
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
      .get("/budgets/1")
      .set("access_token", access_token)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
          "name",
          "Transportation and accomodation budget"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // test("[FAILED] Should return error message, status code 401", (done) => {
  //   request(app)
  //     .get("/budgets/1")
  //     .then((response) => {
  //       expect(response.status).toBe(401);
  //       expect(response.body).toHaveProperty("message", "unauthorized");
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });

  // test("[FAILED] Should return error message, status code 404", (done) => {
  //   request(app)
  //     .get("/budgets/100")
  //     .set("access_token", access_token)
  //     .then((response) => {
  //       expect(response.status).toBe(404);
  //       expect(response.body).toHaveProperty("message", "notFound");
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });
});

// describe("POST /budgets", () => {
//   test("[SUCCESS] Should return object, status code 201", (done) => {
//     const data = {
//       name: "Monthly Regular Budget",
//       amount: 10000000,
//       date: new Date("1 January 2021"),
//       due_date: new Date("1 February 2021"),
//     };

//     request(app)
//       .post("/budgets")
//       .set("access_token", access_token2)
//       .send(data)
//       .then((response) => {
//         expect(response.status).toBe(201);
//         expect(response.body).toHaveProperty("name", "Monthly Regular Budget");
//         expect(response.body).toHaveProperty("amount", 10000000);
//         expect(response.body).toHaveProperty("initial_amount", 10000000);
//         expect(response.body).toHaveProperty("date", expect.any(String));
//         expect(response.body).toHaveProperty("due_date", expect.any(String));
//         expect(response.body).toHaveProperty("status", "Unapproved");
//         expect(response.body).toHaveProperty("DepartmentId", 2);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

// test("[FAILED] Should return error message, status code 401", (done) => {
//   request(app)
//     .post("/budgets")
//     .then((response) => {
//       expect(response.status).toBe(401);
//       expect(response.body).toHaveProperty("message", "unauthorized");
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });
// });

// describe("PUT /budgets/:id", () => {
//   test("[SUCCESS] Should return object, status code 200", (done) => {
//     const data = {
//       amount: 8000000,
//       initial_amount: 8000000,
//       date: new Date("1 January 2021"),
//       due_date: new Date("1 March 2021"),
//       status: "Approved",
//     };

//     request(app)
//       .put("/budgets/4")
//       .set("access_token", access_token)
//       .send(data)
//       .then((response) => {
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty("name", "Monthly Regular Budget");
//         expect(response.body).toHaveProperty("amount", 8000000);
//         expect(response.body).toHaveProperty("initial_amount", 8000000);
//         expect(response.body).toHaveProperty("date", expect.any(String));
//         expect(response.body).toHaveProperty("due_date", expect.any(String));
//         expect(response.body).toHaveProperty("status", "Approved");
//         expect(response.body).toHaveProperty("DepartmentId", 2);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

// test("[FAILED] Should return error message, status code 401", (done) => {
//   request(app)
//     .put("/budgets/1")
//     .then((response) => {
//       expect(response.status).toBe(401);
//       expect(response.body).toHaveProperty("message", "unauthorized");
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });

// test("[FAILED] Should return error message, status code 404", (done) => {
//   request(app)
//     .put("/budgets/100")
//     .set("access_token", access_token)
//     .then((response) => {
//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("message", "notFound");
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });
// });

// describe("DELETE /budgets/:id", () => {
//   test("[SUCCESS] Should return success message, status code 200", (done) => {
//     request(app)
//       .delete("/budgets/4")
//       .set("access_token", access_token2)
//       .then((response) => {
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty(
//           "message",
//           "Budget successfully deleted"
//         );
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

// test("[FAILED] Should return error message, status code 401", (done) => {
//   request(app)
//     .delete("/budgets/1")
//     .then((response) => {
//       expect(response.status).toBe(401);
//       expect(response.body).toHaveProperty("message", "unauthorized");
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });

// test("[FAILED] Should return error message, status code 404", (done) => {
//   request(app)
//     .delete("/budgets/1")
//     .set("access_token", access_token)
//     .then((response) => {
//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("message", "notFound");
//       done();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });
// });
