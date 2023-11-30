import mongoose from "mongoose";
import {settingDotEnvDb} from "../config/dotenv.js";

const { db } = settingDotEnvDb();

//connectDB se utilizara en src/app.js
export const connectDB = async () => {
  try {
    console.log("src/database/db.js Trying to connect Data Base on ",db);
    await mongoose.connect(db.localhost);
    console.log("src/database/db.js Data Base is CONNECTED");
  } catch (error) {
    console.log(error);
  }
};