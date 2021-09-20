const { User, Department } = require('../models');
const { verifyToken } = require('../helpers/jsonwebtoken');

async function authentication(req, res, next) {
    const { access_token } = req.headers

    try {
        let { id } = verifyToken(access_token)

        const user = await User.findOne({
            where: {
                id
            },
            include: {
                model: Department,
                attributes: ['name']
            }
        })

        if (!user) {
            throw ({
                name: "InvalidToken"
            })
        } else {
            req.user = {
                id: user.id,
                username: user.username,
                role: user.role,
                department: user.Department.name
            }
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication