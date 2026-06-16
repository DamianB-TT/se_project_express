const ClothingItem = require("../models/clothingItem");
const { CREATED_STATUS_CODE, OK_STATUS_CODE } = require("../utils/error");
const BadRequestError = require("../errors/bad-request-err");
const ForbiddenError = require("../errors/forbidden-err");
const NotFoundError = require("../errors/not-found-err");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(CREATED_STATUS_CODE).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Invalid data provided for clothing item")
        );
      }

      return next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_STATUS_CODE).send(items))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }

      return item
        .deleteOne()
        .then(() => res.status(OK_STATUS_CODE).send({ message: "Item successfully deleted" }));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("No item found with the provided id"));
      }

      return next(err);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS_CODE).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("No item found with the provided id"));
      }

      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS_CODE).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("No item found with the provided id"));
      }

      return next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
