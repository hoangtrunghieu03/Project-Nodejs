const express = require('express')
const app = express()
const port = 3000
const db = require('./config/db')
const path = require('path')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session');
const {authMiddleware} = require('./app/middlewares/AuthMiddleware')

const route = require('./routes')

// connect
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
}));

// Custom middlewares
app.use(authMiddleware)

app.use(morgan('combined'));

app.use(express.json());

app.use(methodOverride('_method'));
// Teamplate engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }, 
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

route(app)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}/login`),
);
