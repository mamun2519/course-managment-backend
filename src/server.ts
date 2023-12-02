import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import { Server } from "http";

let server: Server;
// Uncaught Exception Error Handler
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("uncaught Exception is detected.......");
  process.exit(1);
});

async function database() {
  try {
    await mongoose.connect(config.db as string);
    console.log("database connect Successfully");
    server = app.listen(config.port, () => {
      console.log("server run successfully");
    });
  } catch (e) {
    console.log(e);
  }
  //  UnHandle Promise Rejection Error
  process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection is detected , we are closing our server");
    if (server) {
      server.close(() => {
        console.log("close");
        console.log(error);
        process.exit(1);
      });
    } else {
      console.log("open");
      process.exit(1);
    }
  });
}

database();

process.on("SIGTERM", () => {
  console.log("SIGTERM Is Received");
  if (server) {
    server.close();
  }
});
