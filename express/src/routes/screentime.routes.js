module.exports = (express, app) => {
  const controller = require("../controllers/screentime.controller.js");
  const router = express.Router();

  // Select all review.
  router.get("/", controller.all);

  // Select one review.
  router.get("/:session_id", controller.one);

  // Create a new review.
  router.post("/", controller.create);

  // Delete a review.
  router.delete("/:session_id", controller.delete);

  // Add routes to server.
  app.use("/api/posts", router);
};
