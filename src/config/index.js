const path = require("path")
const dotenv = require('dotenv')
const fs = require('fs')

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  frontend: {
    baseUrl: process.env.FRONTEND_BASE_URL
  },

  port: process.env.PORT,

  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },

  api: {
    prefix: "/api"
  },

  mysql: {
    limit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },

  jwt: {
    publicKey: fs.readFileSync(path.join(process.cwd(), 'certs/jwt_public.key'), 'utf8'),
    privateKey: fs.readFileSync(path.join(process.cwd(), 'certs/jwt_private.pem'), 'utf8'),
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
  },

  workerpool: {}
};

module.exports = config;
