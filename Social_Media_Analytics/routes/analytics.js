const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics');

router.get('/users', analyticsController.getTopUsers);
router.get('/posts', analyticsController.getTopPosts);
router.get('/posts/:postId/comments', analyticsController.getPostComments);

module.exports = router;