const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(400).send({
      message: "name, weather, and imageUrl are required fields",
    });
  }

  if (name.length < 2 || name.length > 30) {
    return res.status(400).send({
      message: "name must be between 2 and 30 characters",
    });
  }

  return ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Invalid data provided for clothing item",
        });
      }
      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => {
      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({
      message: "The provided itemId is not valid. Please check the format.",
    });
  }

  return ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() =>
      res.status(200).send({
        message: "Item successfully deleted",
      })
    )
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "No item found with the provided id",
        });
      }
      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({
      message: "The provided itemId is not valid. Please check the format.",
    });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "No item found with the provided id",
        });
      }
      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({
      message: "The provided itemId is not valid. Please check the format.",
    });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          message: "No item found with the provided id",
        });
      }
      return res.status(500).send({
        message: "An error has occurred on the server",
      });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
