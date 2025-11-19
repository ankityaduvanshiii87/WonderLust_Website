const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://127.0.0.1:27017/WonderLust", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected successfully"))
  .catch(err => console.error("❌ Connection error:", err));