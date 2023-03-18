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

    // [GET] / (search)
    async search(req, res) {
        const query = req.query.query; // Lấy từ khóa tìm kiếm từ query parameter

        try {
        // Tìm kiếm các bài viết có tiêu đề hoặc nội dung chứa từ khóa tìm kiếm
        const Courses = await Course.find({
        $or: [
            { name: { $regex: query, $options: 'i' } }, // $regex: Tìm kiếm theo biểu thức chính quy, $options: 'i' tìm kiếm không phân biệt chữ hoa chữ thường
        ]
        }).lean();

        // res.render('/', { Courses, query }); // Hiển thị kết quả tìm kiếm
        res.json({ Courses })

        } catch (err) {
        console.log(err);
        res.render('error', { message: 'Lỗi tìm kiếm' });
        }
    }

}

module.exports = new HomeController();
