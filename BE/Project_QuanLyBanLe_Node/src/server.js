const config = require("./config");
const app = require("./app");
const { connectDB } = require("./config/db");

(async () => {
  try {
    await connectDB();
    console.log("Connected to SQL Server");
  } catch (err) {
    console.error("DB connection error:", err.message);
  }

  app.listen(config.port, () => {
    console.log(`Node API dang chay tai http://localhost:${config.port}`);
  });
})();
