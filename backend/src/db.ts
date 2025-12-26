import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const mongoURI = process.env.MONGODB_URI || "";

if (!mongoURI) {
  console.error("MONGODB_URI is not defined in .env file");
}

mongoose.connect(mongoURI);

export default mongoose;