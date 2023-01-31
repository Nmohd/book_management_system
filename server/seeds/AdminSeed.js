import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import config from "config";

// import "../dbConnect.js";
// import adminModel from "../models/Admin/index.js"

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://unknown:12345@sandbox.1nsjpu6.mongodb.net/book-management"
    )
    console.log("Mongo DB is Connected")
  } catch (error) {
    console.log(error)
  }
}

connectDB()

let adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    userverified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "admin"
    }
});

let adminModel = new mongoose.model("Admin", adminSchema, "admin");


async function insertAdmins() {
    try {
        let admin = {
            name: "Adnan Ali Khan",
            password: "Temp@123",
            email: "adnan@co0de.in",
            role: "admin"
        }
        admin.password = await bcrypt.hash(admin.password, 12)
        let adminData = new adminModel(admin);
        await adminData.save();
        console.log("Admin Seeded Successfully")
    } catch (error) {
        console.error(error);
    }
}

insertAdmins();