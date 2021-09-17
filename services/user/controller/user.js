const { User } = require('../models');
const { signJWT } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

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
                }
            })
            const invalid = {
                name: 'Unauthorized',
                message: 'Invalid email/password'
            }
            
            if (!user) {
                throw (invalid)
            } else {
                if (!comparePassword(password, user.password)) {
                    throw (invalid)
                } else {
                    const payload = {
                        id: user.id,
                        role: user.role,
                    }

                    const access_token = signJWT(payload)

                    res.status(200).json({
                        access_token,
                        username: user.username,
                        role: user.role
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController