const { User, Department } = require('../models');
const { createToken } = require('../helpers/jsonwebtoken');
const { checkPassword } = require('../helpers/bcrypt');

class UserController {
    static async register(req, res, next) {
        const {
            email,
            username,
            password,
            role,
            DepartmentId
        } = req.body

        try {
            const newUser = await User.create({
                email,
                username,
                password,
                role,
                DepartmentId
            })
            
            res.status(201).json(newUser)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            const user = await User.findOne({
                where: {
                    email
                },
                include: {
                    model: Department,
                    attributes: ['name']
                }
            })
            const invalid = {
                name: 'Unauthorized',
                message: 'Invalid email/password'
            }
            
            if (!user) {
                throw (invalid)
            } else {
                if (!checkPassword(password, user.password)) {
                    throw (invalid)
                } else {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        role: user.role,
                        department: user.Department.name
                    }

                    const access_token = createToken(payload)

                    res.status(200).json({
                        access_token,
                        username: user.username,
                        role: user.role,
                        department: user.Department.name
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController;
