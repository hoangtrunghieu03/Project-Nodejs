const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseCotroller');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.post('/handle-from-actions', courseController.handleFromActions)
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);
router.get('/:slug', courseController.show);
router.post('/:slug/comment', courseController.comment);

module.exports = router;
