import express from "express";

import Logger from "./loaders/logger";
import config from "./config";
import { serverLoader } from "./loaders";

// CHANGE TO HTTPS WHEN USING REAL SERVER
import https from "http"

const startServer = () => {
  const app = express();

  serverLoader({ expressApp: app });

  const server = https.Server(app);

  server.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
};

startServer();
