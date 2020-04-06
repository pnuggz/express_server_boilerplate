import { Router } from "express";

import middlewares from "./middlewares/index";
const isAuth = middlewares.isAuth;
const renewToken = middlewares.renewToken;

import UserService from "../../services/userService";

const UserRouter = (app) => {
  const route = Router();

  app.use("/users", route);

  route.get("/me", isAuth, renewToken, async (req, res) => {
    const returnData = req.returnData;

    const userDataResponse = await UserService.get(req);
    if (userDataResponse.status.code !== 200) {
      returnData.status = userDataResponse.status;
      res.status(userDataResponse.status.code).json(returnData);
    }

    returnData.data = userDataResponse.data;
    returnData.status = {
      code: 200,
      err: ``,
      msg: ``,
    };
    res.json(returnData);
  });
};

export default UserRouter;
