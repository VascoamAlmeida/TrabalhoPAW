const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || "Administrator";
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/recicla_textil";

  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD before running create-admin.");
  }

  await mongoose.connect(mongoUri);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("An account with that email already exists.");
    return;
  }

  await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 8),
    role: "Admin",
    points: 0,
  });

  console.log("Administrator created successfully.");
}

main()
  .catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
