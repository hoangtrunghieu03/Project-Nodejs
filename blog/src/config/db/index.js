const mongoode = require('mongoose')

async function connect() {
    try {
        await mongoode.connect('mongodb://127.0.0.1:27017/books'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            userCreateIndex: true,
        }
        console.log('Connect successfully')
    } catch (err) {
        console.log('Connect failure!!!');
    }
}


module.exports = { connect };
