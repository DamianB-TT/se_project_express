const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      return res.status(500).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { imageUrl } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(500).send({ message: err.message });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(500).send({ message: err.message });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item id" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      }

      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
