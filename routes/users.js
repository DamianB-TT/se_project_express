const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUpdateUserBody } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUserBody, updateUser);

module.exports = router;
