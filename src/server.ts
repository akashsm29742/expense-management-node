import { env } from "./config/env";
import app from "./app";
import { connectDB } from "./core/db";

connectDB();

app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
