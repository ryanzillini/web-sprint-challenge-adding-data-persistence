// build your `Resource` model here
const db = require("../../data/dbConfig");

async function getAll() {
  const rows = await db("resources");
  return rows;
}

async function getById(resource_id) {
  const resource = await db("resources").where("resource_id", resource_id);
  return resource;
}

function insert(resource) {
  const newPost = db("resources")
    .insert(resource)
    .then(([resource_id]) => {
      return db("resources").where("resource_id", resource_id).first();
    });

  return newPost;
}

module.exports = {
  getAll,
  insert,
  getById,
};
