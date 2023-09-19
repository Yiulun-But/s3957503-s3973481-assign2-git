module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all review.
  router.get("/", controller.all);

  router.get("/:review_id", controller.one);

  // Create a new review.
  router.post("/", controller.create);

  // Delete a review.
  router.delete("/", controller.delete);

  // Delete a review.
  router.get("/view/:user_id", controller.view);

  // Add routes to server.
  app.use("/api/posts", router);
};
