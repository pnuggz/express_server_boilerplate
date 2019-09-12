import { Router } from "express"

import UserService from "../../services/userService"

const UserRouter = (app) => {
  const route = Router()

  app.use('/users', route);

  route.get('/me', 
    // ADD MIDDLEWARE VALIDATOR HERE
    async (req, res) => {
      const userData = "TEST"

      const { user } = await UserService.test(userData)
      return res.json({ user })
    }
  );
};

export default UserRouter