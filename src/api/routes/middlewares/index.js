import isAuth from "./isAuth.js"
import renewToken from "./renewToken.js"

const middlewares = {
  isAuth: isAuth,
  renewToken: renewToken,
};

export default middlewares;
