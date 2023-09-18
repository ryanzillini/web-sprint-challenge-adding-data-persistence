// build your `Project` model here
const db = require("../../data/dbConfig");

async function getAll() {
  const rows = await db("projects");

  return rows;
}

function insert(project) {
  return db("projects")
    .insert(project)
    .then(([project_id]) => {
      return db("projects as p").where("project_id", project_id).first();
    });
}

module.exports = {
  getAll,
  insert,
};
