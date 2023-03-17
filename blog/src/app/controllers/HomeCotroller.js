const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class HomeController {
    home (req, res, next) {
        // res.render('home', { isLoggedIn: req.session.isLoggedIn})
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                    isLoggedIn: req.session.isLoggedIn
                });
            })
            .catch(next);
    }
}

module.exports = new HomeController();
