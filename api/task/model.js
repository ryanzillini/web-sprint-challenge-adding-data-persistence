// build your `Task` model here

const db = require("../../data/dbConfig");

async function getAll() {
  const tasks = await db("tasks as t")
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    );

  const updatedTasks = [];

  tasks.forEach((task) => {
    updatedTasks.push({
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: task.task_completed === 1 ? true : false,
      project_name: task.project_name,
      project_description: task.project_description,
    });
  });

  return updatedTasks;
}

async function getById(task_id) {
  const task = await db("tasks").where("task_id", task_id);
  return task;
}

async function insert(task) {
  const [task_id] = await db("tasks").insert(task);
  const newTask = await getById(task_id);
  return {
    task_completed: newTask[0].task_completed === 1 ? true : false,
    task_description: newTask[0].task_description,
    task_notes: newTask[0].task_notes,
  };
}

module.exports = {
  getAll,
  insert,
};
