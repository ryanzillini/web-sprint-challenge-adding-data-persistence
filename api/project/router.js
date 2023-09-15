// build your `/api/projects` router here
const router = require("express").Router();
const Projects = require("./model");

router.get("/", (req, res, next) => {
  return Projects.getAll();
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
