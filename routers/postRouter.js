const postCtrl = require("../controllers/postCtrl");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/posts", auth, postCtrl.createPost);
router.get(`/posts`, auth, postCtrl.getPost);
router.patch("/post/:id", auth, postCtrl.updatePost);
router.patch("/post/:id/like", auth, postCtrl.likePost);
router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);

module.exports = router;
