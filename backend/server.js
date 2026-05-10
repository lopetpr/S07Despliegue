import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize
  .sync({ force: false })
  .then(async () => {
    const count = await db.role.count();
    if (count === 0) {
      await db.role.bulkCreate([
        { id: 1, name: "user" },
        { id: 2, name: "moderator" },
        { id: 3, name: "admin" }
      ]);
      console.log("Roles seeded.");
    }
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("DB sync error:", err));
