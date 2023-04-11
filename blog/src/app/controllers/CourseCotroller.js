const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] .courses/:slug
        show(req, res, next) {
            Course.findOne({ slug: req.params.slug })
                .populate({
                    path: 'comments.userId',
                    options: { strictPopulate: false }
                })
                .then((course) => {
                    res.render('courses/show', {
                        course: course.toObject(),
                        comments: course.comments.map((comment) => {
                            const user = comment.userId.toObject();
                            return {
                                ...comment.toObject(),
                                user: {
                                    name: user.name,
                                    email: user.email,
                                },
                            };
                        }),
                    });
                })
                .catch(next);
            }

    //[POST] .courses/:slug/comment
    async comment(req, res) {
        try {
            const userId = req.session.user._id;
            const content = req.body.content;

            const course = await Course.findOne({ slug: req.params.slug });
            
            if (!course) {
                // handle error when course is not found
            }

            if (!course.comments) {
                course.comments = [];
            }

            const newComment = {
                userId: userId,
                content: content
            };

            course.comments.push(newComment);
            await course.save();
            
            res.redirect('back');
        } catch (error) {
            console.error(error);
            res.redirect('/');
        }
    }
      

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    
    // store(req, res, next) {
    //     req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    //     const course = new Course(req.body);
    //     course
    //         .save()
    //         .then(() => res.redirect('/me/stored/courses'))
    //         .catch((error) => {});
    // }

    store(req, res, next) {
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => {});
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /courses/:id/
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back')) 
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back')) 
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back')) 
            .catch(next)
    }

    // [post] /courses/handle-from-actions
    handleFromActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds }})
                    .then(() => res.redirect('back')) 
                    .catch(next)
                break
            default: 
                res.json({ message: 'Action invalid'})
        }
    }    
}

module.exports = new CourseController();
