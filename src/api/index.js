import express, { Router } from "express"

import user from './routes/user';
import signup from "./routes/signup"
import login from "./routes/login"

// guaranteed to get dependencies
const routes = () => {
  const app = Router()
    .use(express.json())
    .use(express.urlencoded({ extended: true }));

	signup(app);
  login(app);
	user(app);

	return app
}

export default routes