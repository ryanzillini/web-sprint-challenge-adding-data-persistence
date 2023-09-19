// build your `Project` model here
const db = require("../../data/dbConfig");

async function getAll() {
  const rows = await db("projects");
  const result = [];
  rows.forEach((project) => {
    result.push({
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: project.project_completed === 1 ? true : false,
    });
  });
  return result;
}

async function findById(project_id) {
  const project = await db("projects as p").where("project_id", project_id);
  return project;
}

async function insert(project) {
  const [project_id] = await db("projects").insert(project);

  const newProj = await findById(project_id);
  let updatedProj = null;
  newProj.forEach((project) => {
    if (project.project_completed === null || project.project_completed === 0) {
      project.project_completed = false;
    } else project.project_completed = true;
    updatedProj = project;
  });
  return updatedProj;
}

module.exports = {
  getAll,
  insert,
};
