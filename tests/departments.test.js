const app = require("../app");
const request = require("supertest");

describe("Departments Route Test", () => {
  describe("GET /departments", () => {
    test("200 Success get departments", (done) => {
      request(app)
        .get("/departments")
        .set("Accept", "application/json")
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
  });
});
