const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post(`/comment`, auth, commentCtrl.createComment);

module.exports = router;
