module.exports = (express, app) => {
  const controller = require("../controllers/movie.controller.js");
  const router = express.Router();

  // Select all review.
  router.get("/", controller.all);

  // Select one review.
  router.get("/:movie_id", controller.one);

  // Create a new review.
  router.post("/", controller.create);

  // Delete a review.
  router.delete("/:movie_id", controller.delete);

  // Add routes to server.
  app.use("/api/posts", router);
};
