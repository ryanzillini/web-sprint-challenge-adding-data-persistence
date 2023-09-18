// build your `/api/resources` router here
const router = require("express").Router();
const Resources = require("./model");
const db = require("../../data/dbConfig");

router.get("/", async (req, res, next) => {
  const rows = await Resources.getAll();
  res.status(200).json(rows);
  next();
});

// router.post("/", async (req, res, next) => {
//   try {
//     const existing = await Resources.getAll();
//     const newPost = {
//       resource_name: req.body.resource_name,
//       resource_description: req.body.resource_description,
//     };
//     if (req.body.name === existing.resource_name) {
//       res.status(400).json({ message: "resource_name must be unique" });
//     } else {
//       Resources.insert(newPost).then((resource) => {
//         res.status(201).json(resource);
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

router.use((err, req, res, next) => {
  res.status(500).json({
    customMessage: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
