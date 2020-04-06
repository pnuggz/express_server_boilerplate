const path = require("path");

const UserModel = require(path.join(__dirname, "../models/userModel"));

const returnData = {};

const get = async (req) => {
  const userId = req.user.id;

  const userResponse = await UserModel.getUser(userId);
  if (userResponse.status.code !== 200) {
    returnData.status = userResponse.status;
    return returnData;
  }

  returnData.status = {
    code: 200,
    error: ``,
    message: ``,
  };
  returnData.data = userResponse.data;
  return returnData;
};

const UserService = {
  get: get,
};

module.exports = UserService;
