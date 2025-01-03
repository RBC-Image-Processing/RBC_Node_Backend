require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    logging: false,
    dialect: "postgres",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    logging: false,
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    logging: false,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Use this if the SSL certificate is self-signed
      },
    },
  },
};
