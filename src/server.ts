import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  const PORT = env.port;

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
};

startServer();
