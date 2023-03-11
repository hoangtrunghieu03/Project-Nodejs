const loginRouter = require('./login')
const registerRouter = require('./register')

function route(app) {
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
} 

module.exports = route;
