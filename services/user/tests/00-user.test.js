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
                expect(body).toHaveProperty('id', expect.any(Number))
                expect(body).toHaveProperty('email', expect.any(String))
                expect(body.email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
                expect(body.email).toMatch(userTestData.email)
                expect(body).toHaveProperty('username', expect.any(String))
                expect(body.username).toMatch(userTestData.username)
                expect(body).toHaveProperty('role', expect.any(String))
                expect(body.role).toMatch(userTestData.role)
                expect(body).toHaveProperty('DepartmentId', expect.any(Number))
                expect(body.DepartmentId).toBe(userTestData.DepartmentId)
                // expect(body).toHaveProperty('Department', expect.any(Object))
                // expect(body.Department).toHaveProperty('name', expect.any(String))
                // expect(body.Department.name).toMatch('Finance')
                done()
            }).catch((err) => {
                done(err)
            });
    })
})

describe('POST /register [ERROR CASE]', () => {
    test('Email null | Should return an Object with message |  Status code 400', (done) => {
        let testEmailNullData = {
            ...userTestData, email: null
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testEmailNullData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Email cannot be null')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
    test('Email empty string | Should return an Object with message |  Status code 400', (done) => {
        let testEmailEmptyData = {
            ...userTestData, email: ''
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testEmailEmptyData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(2)
                expect(body.message[0]).toMatch('Email cannot be empty')
                expect(body.message[1]).toMatch('Invalid email format')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
    test('Invalid email format | Should return an Object with message | Status code 400', (done) => {
        let testInvalidEmailData = {
            ...userTestData, email: 'notvalidemail'
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testInvalidEmailData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Invalid email format')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
    test('Unique Email violation | Should return an Object with message | Status code 400', (done) => {
        let testUniqueEmailViolatedData = {
            ...userTestData, email: 'testingLogin@mail.com'
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testUniqueEmailViolatedData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Email already exist')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
    test('Password Null | Should return an Object with message | Status code 400 ', (done) => {
        let testPasswordNullData = {
            ...userTestData, password: null
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testPasswordNullData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Password cannot be null')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
    test('Password Empty | Should return an Object with message | Status code 400', (done) => {
        let testPasswordEmptyData = {
            ...userTestData, password: ''
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testPasswordEmptyData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Password cannot be empty')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
    test('Username Null | Should return an Object with message | Status code 400 ', (done) => {
        let testPasswordEmptyData = {
            ...userTestData, username: null
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testPasswordEmptyData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Username cannot be null')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })

    test('Username Empty | Should return an Object with message | Status code 400 ', (done) => {
        let testPasswordEmptyData = {
            ...userTestData, username: ''
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testPasswordEmptyData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Username cannot be Empty')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
    test('Role Null | Should return an Object with message | Status code 400 ', (done) => {
        let testPasswordEmptyData = {
            ...userTestData, role: null
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testPasswordEmptyData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Role cannot be null')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })

    test('Role Empty | Should return an Object with message | Status code 400 ', (done) => {
        let testPasswordEmptyData = {
            ...userTestData, role: ''
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testPasswordEmptyData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Role cannot be Empty')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })

    test('DepartmentId Null | Should return an Object with message | Status code 400 ', (done) => {
        let testPasswordEmptyData = {
            ...userTestData, DepartmentId: null
        }

        request(app)
            .post('/register')
            .set('Accept', 'application/json')
            .send(testPasswordEmptyData)
            .then(({ status, body }) => {
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Please select department')
                expect(body).not.toHaveProperty('id')
                expect(body).not.toHaveProperty('email')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                expect(body).not.toHaveProperty('DepartmentId')
                expect(body).not.toHaveProperty('id')
                done()
            }).catch((err) => {
                done(err)
            });
    })
})

// TEST LOGIN USER

describe('POST /login [SUCCESS CASE]', () => {
    test('should return object with access_token', (done) => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(userTestLoginData)
            .then(({ status, body }) => {
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token', expect.any(String))
                expect(body).toHaveProperty('username', expect.any(String))
                expect(body.username).toMatch('Test User')
                expect(body).toHaveProperty('role', expect.any(String))
                expect(body.role).toMatch('manager')
                expect(body).not.toHaveProperty('message')
                done()
            }).catch((err) => {
                done(err)
            });
    })
    
})

describe('POST /login [ERROR CASE]', () => {
    test('Wrong Email | Should return an Object with message | Status code 401 ', (done) => {
        let wrongEmailData = {
            ...userTestLoginData, email: 'wrongemail'
        }

        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(wrongEmailData)
            .then(({ status, body }) => {
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Invalid email/password')
                expect(body).not.toHaveProperty('access_token')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                done()
            }).catch((err) => {
                done(err)
            });
    })

    test('Wrong Password | Should return an Object with message | Status code 401 ', (done) => {
        let wrongPasswordLoginData = {
            ...userTestLoginData, password: 'wrong'
        }

        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send(wrongPasswordLoginData)
            .then(({ status, body }) => {
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', expect.any(Array))
                expect(body.message).toHaveLength(1)
                expect(body.message[0]).toMatch('Invalid email/password')
                expect(body).not.toHaveProperty('access_token')
                expect(body).not.toHaveProperty('username')
                expect(body).not.toHaveProperty('role')
                done()
            }).catch((err) => {
                done(err)
            });
            
    })
    
    
})