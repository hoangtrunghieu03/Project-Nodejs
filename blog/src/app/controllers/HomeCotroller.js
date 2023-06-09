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

            if (courses.length === 0) {
              res.render('home', {
                message: `Không tìm thấy "${query}" trong thư viện`,
                isLoggedIn: req.session.isLoggedIn
              });
            } else {
              res.render('home', {
                courses,
                isLoggedIn: req.session.isLoggedIn
              });
            }
          } catch (error) { 
            res.render('err')           
          }
        }
    }

module.exports = new HomeController();
