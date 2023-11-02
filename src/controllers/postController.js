const Post = require('../models/Post')

// Controller để tạo bài đăng
const createPost = async (req, res) => {
  try {
    const { user_id, user_name, content, image_url } = req.body;
    const newPost = new Post({
      user_id,
      user_name,
      content,
      image_url,
      comments: [],
      likes: [],
    });

    await newPost.save();

    res.status(201).json({ message: 'Bài đăng đã được tạo' });
  } catch (error) {
    console.error('Lỗi khi tạo bài đăng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
// Controller getAllPost
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Lỗi khi lấy tất cả bài đăng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Controller để tạo bình luận cho bài viết
const createComment = async (req, res) => {
  try {
    const { post_id, contentCmt, user_id, user_name } = req.body;

    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({ message: 'Bài viết không tồn tại' });
    }
    const comment = {
      user_id,
      contentCmt,
      user_name,
    };
    post.comments.push(comment);
    await post.save();

    res.status(201).json({ message: 'Bình luận đã được tạo' });
  } catch (error) {
    console.error('Lỗi khi tạo bình luận:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Controller thêm like cho bài đăng
const addLike = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({ message: 'Bài đăng không tồn tại' });
    }

    const like = post.likes.find(like => like._id.toString() === user_id);
    if (like) {
      return res.status(400).json({ message: 'Người dùng đã thả tim cho bài đăng này' });
    }

    post.likes.push(user_id);
    await post.save();
    res.status(200).json({ message: 'Thả tim thành công' });
  } catch (error) {
    console.error('Lỗi khi thả tim:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Controller thêm like cho bài đăng
const removeLike = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;
    const post = await Post.findById(post_id);

    if (!post) {
      return res.status(404).json({ message: 'Bài đăng không tồn tại' });
    }
    const like = post.likes.find(like => like._id.toString() === user_id);
    if (!like) {
      return res.status(400).json({ message: 'Người dùng chưa like bài đăng này' });
    }

    post.likes = post.likes.filter((like) => like._id.toString() !== user_id.toString());
    await post.save();
    res.status(200).json({ message: 'Like đã được xóa' });
  } catch (error) {
    console.error('Lỗi khi xóa like:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  createComment,
  addLike,
  removeLike,
};