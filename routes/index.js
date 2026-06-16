const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");
const NotFoundError = require("../errors/not-found-err");
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

router.post("/signin", validateAuthentication, login);
router.post("/signup", validateUserBody, createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
});

module.exports = router;
