// 單獨 run seeder 時，需要調用 dotenv
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_KEY,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "CLEARDB_DATABASE_URL",
    "dialect": "mysql"
  }
}