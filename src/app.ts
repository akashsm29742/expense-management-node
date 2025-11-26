// src/app.ts
import express from "express";
import cors from "cors";

import { routes } from "./routes";
import { errorHandler } from "./middleware/error-handler";
import { registerNotificationHandlers } from "./modules/notifications/notification.service";

const app = express();

app.use(cors());
app.use(express.json());

// register events once
registerNotificationHandlers();

// Mount routes from array
routes.forEach(({ path, router, middlewares }) => {
  if (middlewares && middlewares.length > 0) {
    // If specific middlewares are configured for this route group
    app.use(path, ...middlewares, router);
  } else {
    app.use(path, router);
  }
});

// Global error handler at the end
app.use(errorHandler);

export default app;
