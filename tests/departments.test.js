const request = require('supertest');
const { test, describe, expect, beforeAll, afterAll } = require('@jest/globals');

const app = require('../app');
const { sequelize } = require('../models');

const { queryInterface } = sequelize

beforeAll((done) => {
    queryInterface.bulkInsert('Departments', [
        {
            name: 'Department 1',
            createdAt: new Date(),
            updatedAt: new Date ()
        },
        {
            name: 'Department 2',
            createdAt: new Date(),
            updatedAt: new Date ()
        },
        {
            name: 'Department 3',
            createdAt: new Date(),
            updatedAt: new Date ()
        },
    ])
    .then(() => {
        done()
    }).catch((err) => {
        done(err)
    });
})

afterAll((done) => {
    queryInterface
        .bulkDelete('Departments', {})
        .then(() => {
            done()
        }).catch((err) => {
            done(err)
        });
})



describe('GET /departments [SUCCESS CASE]', () => {
    test('should return array of object with id and name | Status code 200', (done) => {
        request(app)
            .get('/departments')
            .set('Accept', 'application/json')
            .then(({ status, body }) => {
                expect(status).toBe(200)
                expect(body).toHaveLength(3)
                expect(body[0]).toHaveProperty('id', expect.any(Number))
                expect(body[0]).toHaveProperty('name', expect.any(String))
                // expect(body).toHaveProperty('id', expect.any(Number))
                // expect(body).toHaveProperty('name', expect.any(String))
                done()
            }).catch((err) => {
                done(err)
            });
    })
})
