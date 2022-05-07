const { Question } = require("../models");

exports.get = async (req, res) => {
  let questions;
  try {
    questions = await Question.find();
  } catch (err) {
    throw err;
  }
  if (questions) return res.json({ questions });
  else return res.json({ message: "Invalid Connection" });
};
