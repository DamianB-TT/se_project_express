const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");
const { NOT_FOUND_STATUS_CODE } = require("../utils/error");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

module.exports = router;
