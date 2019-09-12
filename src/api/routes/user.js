import {Router} from "express"

const userRouter = (app) => {
  const route = Router()

  app.use('/users', route);

  route.get('/me', (req, res) => {
    res.send("TEST")
  });
};

export default userRouter