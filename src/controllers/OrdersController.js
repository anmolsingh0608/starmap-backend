const Order = require("../models/order");

const getAll = (req, res) => {
  try {
    Order.find({})
      .then((orders) => {
        res.status(200).json({
          orders,
        });
      })
      .catch((err) => {
        res.status(403).json({
          err,
        });
      });
  } catch (e) {
    console.log(e);
  }
};

const getById = (req, res) => {
  try {
    const { id } = req.params;
    Order.findById(id)
      .then((order) => {
        res.status(200).json(order);
      })
      .catch((err) => res.status(403).json(err));
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAll,
  getById,
};
