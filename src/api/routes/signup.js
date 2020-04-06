import { Router } from "express"

import SignupService from "../../services/signupService.js"

const SignupRouter = app => {
  const route = Router();

  app.use("/signup", route);

  route.post("/", async (req, res) => {
    const returnData = {};

    const userData = await SignupService.signupUser(req);
    const userDataStatusCode = userData.status.code;
    if (userDataStatusCode === 500) {
      returnData.status = userData.status;
      res.status(userDataStatusCode).json(returnData);
      return;
    }

    const user = userData.data.user;

    returnData.data = {
      user: user
    };
    returnData.status = userData.status;
    res.json(returnData);
  });
};

export default SignupRouter;
