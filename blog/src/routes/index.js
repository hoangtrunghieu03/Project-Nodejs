const loginRouter = require('./login')
const registerRouter = require('./register')
const logoutRouter = require('./logout')
const homeRouter= require('./home')

function route(app) {
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/logout', logoutRouter)
    
    app.use('/', homeRouter)

} 

module.exports = route;
