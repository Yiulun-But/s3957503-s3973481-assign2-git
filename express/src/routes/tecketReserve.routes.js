module.exports = (express, app) => {
  const controller = require("../controllers/ticketReserve.controller.js");
  const router = express.Router();

  // Select all reserves.
  router.get("/", controller.all);

  // Select one reserve.
  router.get("/:booking_id", controller.one);

  // Create a new reserve.
  router.post("/", controller.create);

  // Delete a reserve.
  router.delete("/:booking_id", controller.delete);

  // Add routes to server.
  app.use("/api/posts", router);
};
