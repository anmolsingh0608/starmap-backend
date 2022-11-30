const Map = require("../models/maps");
const { validationResult } = require("express-validator");

const getMap = (req, res) => {
  const query = req.query.q;
  try {
    if (query) {
      Map.findOne({ name: query }, (err, doc) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(doc);
      });
    } else {
      Map.find({}, (err, doc) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(doc);
      })
    }
  } catch (e) {
    res.status(500).json(e);
  }
};

const postMap = (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(403).json(errors);
  } else {
    const { name } = req.body;
    Map.findOneAndUpdate(
      { name: name },
      req.body,
      { upsert: true, new: true },
      (err, doc) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(doc);
      }
    );
  }
};

module.exports = {
  getMap,
  postMap,
};
