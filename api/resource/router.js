// build your `/api/resources` router here
const router = require("express").Router();
const Resources = require("./model");

router.get("/", async (req, res, next) => {
  const rows = await Resources.getAll();
  res.status(200).json(rows);
  next();
});

router.post("/", async (req, res, next) => {
  const newPost = req.body;
  await Resources.insert(newPost)
    .then((resource) => {
      res.status(202).json(resource);
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
