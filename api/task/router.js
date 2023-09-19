// build your `/api/tasks` router here
const Tasks = require("./model");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  const tasks = await Tasks.getAll();
  res.status(200).json(tasks);
  next();
});

router.post("/", async (req, res, next) => {
  await Tasks.insert(req.body)
    .then((project) => {
      res.status(202).json(project);
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
