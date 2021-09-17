const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

beforeEach(done => {
    let userTestDataLogin = {
        username: 'Test User',
        email: 'testingLogin@mail.com',
        password: 'password',
        role: 'manager',
        DepartmentId: 1
    }

    User
        .create(userTestDataLogin)
        .then((result) => {
            done()
        }).catch((err) => {
            done(err)
        });
})

afterEach(done => {
    User
        .destroy({
            where: {},
            truncate: true,
            cascade: true,
            restartIdnetity: true
        })
        .then((result) => {
            done()
        }).catch((err) => {
            done(err)
        });
})

let userTestData = {
    username: 'Test User',
    email: 'testing@mail.com',
    password: 'password',
    role: 'manager',
    DepartmentId: 1
}

let userTestLoginData = {
    email: 'testingLogin@mail.com',
    password: 'password'
}

// TEST REGISTER USER

describe('POST /register [SUCCESS CASE]', () => {
    test('should return an object with id, username, email, and role', (done) => {
        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(userTestData)
            .then(({status, body}) => {
                expect(status).toBe(201)
                
                done()
            }).catch((err) => {
                done(err)
            });
        // try {
        //     const { status, body } = await request(app)
        //         .post('/register')
        //         .set('Accept', 'application/json')
        //         .send(userTestData)
            
        //     expect(status).toBe(201)
        //     return done()
        // } catch (err) {
        //     return done(err)
        // }
    })
    
})