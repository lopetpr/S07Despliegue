import db from "../models/index.js";

const User = db.user;

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { username: req.body.username } });
    if (user) return res.status(400).send({ message: "Failed! Username is already in use!" });

    user = await User.findOne({ where: { email: req.body.email } });
    if (user) return res.status(400).send({ message: "Failed! Email is already in use!" });

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (const role of req.body.roles) {
      if (!db.ROLES.includes(role)) {
        return res.status(400).send({ message: `Role "${role}" does not exist!` });
      }
    }
  }
  next();
};
