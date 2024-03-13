// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "db_mkid_dev",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "db_mkid_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },.
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "db_mkid_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT, DB_PORT } =
  process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT,
  },
};