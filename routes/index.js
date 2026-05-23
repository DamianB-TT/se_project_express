const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItem");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(404).send({
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

module.exports = router;
