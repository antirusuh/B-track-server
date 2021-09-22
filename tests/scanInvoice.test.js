const request = require("supertest");
const { test, describe, expect } = require("@jest/globals");

const app = require("../app");

describe("POST /scanInvoice [SUCCESS CASE]", () => {
  test("should return object with ", (done) => {
    request(app)
      .post("/scanInvoice")
      .set("Accept", "application/json")
      .attach("invoice-file", "tests/file-invoice/test-invoice.pdf")
      .then(({ status, body }) => {
        expect(status).toBe(200);
        expect(body).toHaveProperty("totalInvoice", expect.any(Number));
        expect(body).toHaveProperty("invoiceUrl", expect.any(String));
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  }, 20000);
});
