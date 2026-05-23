const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  CREATED_STATUS_CODE,
  OK_STATUS_CODE,
} = require("../utils/error");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(BAD_REQUEST_STATUS_CODE).send({
      message: "name, weather, and imageUrl are required fields",
    });
  }

  if (name.length < 2 || name.length > 30) {
    return res.status(BAD_REQUEST_STATUS_CODE).send({
      message: "name must be between 2 and 30 characters",
    });
  }

  return ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(CREATED_STATUS_CODE).send(item))
    .catch((err) =>
      err.name === "ValidationError"
        ? res.status(BAD_REQUEST_STATUS_CODE).send({
            message: "Invalid data provided for clothing item",
          })
        : res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: "An error has occurred on the server",
          })
    );
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_STATUS_CODE).send(items))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
        message: "An error has occurred on the server",
      })
    );
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST_STATUS_CODE).send({
      message: "The provided itemId is not valid. Please check the format.",
    });
  }

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() =>
      res.status(OK_STATUS_CODE).send({
        message: "Item successfully deleted",
      })
    )
    .catch((err) =>
      err.name === "DocumentNotFoundError"
        ? res.status(NOT_FOUND_STATUS_CODE).send({
            message: "No item found with the provided id",
          })
        : res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: "An error has occurred on the server",
          })
    );
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST_STATUS_CODE).send({
      message: "The provided itemId is not valid. Please check the format.",
    });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS_CODE).send(item))
    .catch((err) =>
      err.name === "DocumentNotFoundError"
        ? res.status(NOT_FOUND_STATUS_CODE).send({
            message: "No item found with the provided id",
          })
        : res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: "An error has occurred on the server",
          })
    );
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(BAD_REQUEST_STATUS_CODE).send({
      message: "The provided itemId is not valid. Please check the format.",
    });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS_CODE).send(item))
    .catch((err) =>
      err.name === "DocumentNotFoundError"
        ? res.status(NOT_FOUND_STATUS_CODE).send({
            message: "No item found with the provided id",
          })
        : res.status(INTERNAL_SERVER_ERROR_STATUS_CODE).send({
            message: "An error has occurred on the server",
          })
    );
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
