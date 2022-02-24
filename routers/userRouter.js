const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

router.get("/search", auth, userCtrl.searchUser);
router.get(`/user/:id`, auth, userCtrl.getUser);
router.patch("/user", auth, userCtrl.updateUser);

module.exports = router;
