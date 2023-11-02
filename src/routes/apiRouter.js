const express = require('express');
const { register, login } = require('../controllers/userController');
const { createPost, getAllPosts, addLike, removeLike, createComment } = require('../controllers/postController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/post', createPost);
router.get('/getAllPosts', getAllPosts);
router.post('/comment', createComment)
router.post('/addLike', addLike);
router.post('/removeLike', removeLike);

module.exports = router