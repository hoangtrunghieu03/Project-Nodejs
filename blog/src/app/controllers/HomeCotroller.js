const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class HomeController {

        // [GET] /
        home (req, res, next) {
            Course.find({})
                .then((courses) => {
                    res.render('home', {
                        courses: mutipleMongooseToObject(courses),
                        isLoggedIn: req.session.isLoggedIn
                    });
                })
                .catch(next);
              }

        // [POST] /search
        async search(req, res, next) {
          const query = req.query.query;
          try {
            const courses = await Course.find({
              $or: [
                { name: { $regex: query, $options: 'i' } }
              ]
            }).lean();

            res.render('search', {
              courses,
              isLoggedIn: req.session.isLoggedIn
            });
          } catch (err) {
            console.log(err);
            res.render('error', { message: 'Lỗi tìm kiếm' });
          }
        }
    }

module.exports = new HomeController();
