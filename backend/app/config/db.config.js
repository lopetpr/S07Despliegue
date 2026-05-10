const config = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "root",
  DB: process.env.DB_NAME || "s07db",
  dialect: process.env.DB_DIALECT || "mysql",
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
};

if (process.env.DATABASE_URL) {
  config.use_env_variable = "DATABASE_URL";
  config.dialectOptions = {
    ssl: { require: true, rejectUnauthorized: false }
  };
}

export default config;
