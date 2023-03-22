const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeCotroller {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next)

        // Course.countDocumentsDeleted() 
        //     .then((deleteCount) => {
        //         console.log(deleteCount)
        //     })
        //     .catch(() => {})
        
        // Course.find({})
        //     .then((course) =>
        //         res.render('me/stored-courses', {
        //             courses: mutipleMongooseToObject(course),
        //         }),
        //     )
        //     .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((course) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(course),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeCotroller();
