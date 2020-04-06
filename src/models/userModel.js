const path = require("path");
const hash = require("string-hash");
const crypto = require("crypto-random-string");

const dateFnsFormat = require("date-fns/format");
const dateFns = {
  format: dateFnsFormat,
};

const Connection = require(path.join(__dirname, "../loaders/mysql"));

const Authorization = require(path.join(__dirname, "../library/authorization"));

const returnData = {};

const createUser = async (req) => {
  const data = req.body;
  const username = data.username;
  const email = data.email;
  const password = data.password;
  const password_salt = data.password_salt;

  const queryString1 = `
    INSERT INTO users (username, email, password, password_salt) 
    VALUES (?, ?, ?, ?)
  `;

  try {
    const [results, fields] = await Connection.query(queryString1, [
      username,
      email,
      password,
      password_salt,
    ]);
    returnData.status = {
      code: 200,
      error: ``,
      message: ``,
    };
    returnData.data = results;
    return returnData;
  } catch (err) {
    console.log(err);
    returnData.status = {
      code: 500,
      error: err,
      message: `Internal server error.`,
    };
    return returnData;
  }
};

const getUsersAll = async () => {
  const queryString1 = `
    SELECT 
    users.id,
    users.id as userId,
    users.username,
    users.email,
    users.is_active
    FROM users 
  `;

  try {
    const [results, fields] = await Connection.query(queryString1);

    returnData.status = {
      code: 200,
      error: ``,
      message: ``,
    };
    returnData.data = results;
    return returnData;
  } catch (err) {
    console.log(err);
    returnData.status = {
      code: 500,
      error: err,
      message: `Internal server error.`,
    };
    return returnData;
  }
};

const getUser = async (userId) => {
  const queryString1 = `
    SELECT 
    users.id,
    users.id as userId,
    users.username,
    users.email,
    users.is_active
    FROM users 
    WHERE users.id = ?`;

  try {
    const [results, fields] = await Connection.query(queryString1, [userId]);

    if (!Authorization.authorize(results, userId)) {
      returnData.status = Authorization.defaultUnauthMsg();
      return returnData;
    }

    returnData.status = {
      code: 200,
      error: ``,
      message: ``,
    };
    returnData.data = results;
    return returnData;
  } catch (err) {
    console.log(err);
    returnData.status = {
      code: 500,
      error: err,
      message: `Internal server error.`,
    };
    return returnData;
  }
};

const getUserByLoginIncPassword = async (login) => {
  const queryString1 = `
    SELECT 
    users.id,
    users.id as userId,
    users.username,
    users.email,
    users.password,
    users.password_salt,
    users.is_active
    FROM users 
    WHERE users.username = ? OR users.email = ?`;

  try {
    const [results, fields] = await Connection.query(queryString1, [
      login,
      login,
    ]);
    const userId = results[0].userId;

    if (!Authorization.authorize(results, userId)) {
      returnData.status = Authorization.defaultUnauthMsg();
      return returnData;
    }

    returnData.status = {
      code: 200,
      error: ``,
      message: ``,
    };
    returnData.data = results;
    return returnData;
  } catch (err) {
    console.log(err);
    returnData.status = {
      code: 500,
      error: err,
      message: `Internal server error.`,
    };
    return returnData;
  }
};

const createVerificationToken = async (userId, username) => {
  const verificationToken = hash(username) + crypto({ length: 16 });

  const queryString1 = `
    INSERT INTO users_verification (user_id, verification_token) 
    VALUES (?, ?)`;

  try {
    const [results, fields] = await Connection.query(queryString1, [
      userId,
      verificationToken,
    ]);

    returnData.status = {
      code: 200,
      error: ``,
      message: ``,
    };
    returnData.data = results;
    return returnData;
  } catch (err) {
    console.log(err);
    returnData.status = {
      code: 500,
      error: err,
      message: `Internal server error.`,
    };
    return returnData;
  }
};

const getVerificationTokenByUser = async (userId) => {
  const queryString1 = `
    SELECT 
    users_verification.*,
    users_verification.user_id as userId
    FROM users_verification 
    WHERE users_verification.user_id = ?`;

  try {
    const [results, fields] = await Connection.query(queryString1, [userId]);

    if (!Authorization.authorize(results, userId)) {
      returnData.status = Authorization.defaultUnauthMsg();
      return returnData;
    }

    returnData.status = {
      code: 200,
      error: ``,
      message: ``,
    };
    returnData.data = results;
    return returnData;
  } catch (err) {
    console.log(err);
    returnData.status = {
      code: 500,
      error: err,
      message: `Internal server error.`,
    };
    return returnData;
  }
};

const getUserFromToken = async (userId) => {
  const queryString1 = `
    SELECT users.id, 
    users.email, 
    users.username 
    FROM users 
    WHERE users.id = ?`;

  try {
    const [results, fields] = await Connection.query(queryString1, [userId]);

    if (!Authorization.authorize(results, userId)) {
      returnData.status = Authorization.defaultUnauthMsg();
      return returnData;
    }

    returnData.status = {
      code: 200,
      error: ``,
      message: ``,
    };
    returnData.data = results;
    return returnData;
  } catch (err) {
    console.log(err);
    returnData.status = {
      code: 500,
      error: err,
      message: `Internal server error.`,
    };
    return returnData;
  }
};

const UserModel = {
  getUserFromToken: getUserFromToken,
  createUser: createUser,
  getUsersAll: getUsersAll,
  getUser: getUser,
  getUserByLoginIncPassword: getUserByLoginIncPassword,
  createVerificationToken: createVerificationToken,
  getVerificationTokenByUser: getVerificationTokenByUser,
};

module.exports = UserModel;
