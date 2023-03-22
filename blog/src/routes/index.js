const loginRouter = require('./login')
const meRouter = require('./me');
const registerRouter = require('./register')
const logoutRouter = require('./logout')
const coursesRouter = require('./courses')
const homeRouter= require('./home')

function route(app) {
    app.use('/register', registerRouter)
    app.use('/login', loginRouter)
    app.use('/logout', logoutRouter)
    app.use('/courses', coursesRouter)
    app.use('/me', meRouter);

    app.use('/', homeRouter)

} 

module.exports = route;
