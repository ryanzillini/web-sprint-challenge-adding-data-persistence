// build your `/api/projects` router here
const router = require("express").Router();
const Projects = require("./model");

router.get("/", async (req, res, next) => {
  const allProjects = await Projects.getAll();
  res.status(200).json(allProjects);
});

router.post("/", async (req, res, next) => {
  await Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
