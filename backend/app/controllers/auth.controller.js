import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const { user: User, role: Role } = db;

export const signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email:    req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    if (req.body.roles) {
      const roles = await Role.findAll({ where: { name: req.body.roles } });
      await user.setRoles(roles);
    } else {
      await user.setRoles([1]);
    }

    res.send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(404).send({ message: "User not found." });

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ message: "Invalid password!" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.jwtExpiration
    });

    const roles = await user.getRoles();

    res.status(200).send({
      id:          user.id,
      username:    user.username,
      email:       user.email,
      roles:       roles.map(r => "ROLE_" + r.name.toUpperCase()),
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
