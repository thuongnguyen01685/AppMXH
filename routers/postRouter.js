const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/posts", auth, postCtrl.createPost);
router.get(`/posts`, auth, postCtrl.getPosts);
router.patch("/post/:id", auth, postCtrl.updatePost);
router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);
router.get("/user_posts/:id", auth, postCtrl.getUserPosts);
router.get("/post/:id", auth, postCtrl.getPost);
router.get("/post_discover", auth, postCtrl.getPostsDiscover);
router.delete("/delete/:id", auth, postCtrl.deletePost);

module.exports = router;
