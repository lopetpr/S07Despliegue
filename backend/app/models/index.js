import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";
import UserModel from "./user.model.js";
import RoleModel from "./role.model.js";

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    pool: dbConfig.pool
  });
} else {
  sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  });
}

const db = {
  Sequelize,
  sequelize,
  user: UserModel(sequelize, Sequelize),
  role: RoleModel(sequelize, Sequelize),
  ROLES: ["user", "admin", "moderator"]
};

db.role.belongsToMany(db.user, { through: "user_roles" });
db.user.belongsToMany(db.role, { through: "user_roles" });

export default db;
