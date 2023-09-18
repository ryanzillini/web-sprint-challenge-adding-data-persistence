// build your `/api/projects` router here
const router = require("express").Router();
const Projects = require("./model");

router.get("/", async (req, res, next) => {
  const allProjects = await Projects.getAll();
  const reducedProjects = allProjects.reduce((acc, projects) => {
    if (
      allProjects.project_completed === null ||
      allProjects.project_completed === 0
    ) {
      return acc.concat({
        project_completed: false,
        project_description: allProjects.project_description,
        project_id: allProjects.project_id,
        project_name: allProjects.project_name,
      });
    }
  });
  res.status(200).json(allProjects);
});

router.post("/", (req, res, next) => {
  Projects.insert({
    project_name: req.body.project_name,
    project_description: req.body.project_description,
    project_completed: req.body.project_completed,
  })
    .then((project) => {
      if (project.project_completed === null) {
        project.project_completed = false;
      }
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
