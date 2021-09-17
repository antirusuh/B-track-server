async function errorHandler(err, req, res, next) {
    let message = []
    let code = 0

    switch (err.name) {
        case 'Unauthorized':
            code = 401
            message.push(err.message)
            break;
    
        case 'SequelizeValidationError':
            code = 400
            err.errors.map(item => {
                return message.push(item.message)
            })
            break;
        
        case 'SequelizeUniqueConstraintError':
            code = 400
            err.errors.map(item => {
                return message.push(item.message)
            })
            break;
        
        default:
            code = 500
            message.push(err.message || 'Internal server error')
            console.log(err);
            break;
    }

    res.status(code).json({ message })
}

module.exports = {
    errorHandler
}