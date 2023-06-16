const router = require("express").Router();
const { Admin } = require("../models/admin");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }

    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) {
      console.log("User not found");
      return res.status(401).send({ message: "Invalid Username or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword) {
      console.log("Invalid password");
      return res.status(401).send({ message: "Invalid Username or Password" });
    }

    const token = admin.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
