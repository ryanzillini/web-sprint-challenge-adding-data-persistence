const projects = [
  {
    project_name: "Trading Card Website",
    project_description: "Build a trading card website",
  },
];

const resources = [
  {
    resource_name: "Computer",
    resource_description: "Need a computer to develop/run code",
  },
  {
    resource_name: "Money",
    resource_description: "Money for advertising and expanding",
  },
  {
    resource_name: "Employees",
    resource_description:
      "Employees are needed to build the servers and for customer support",
  },
];

const tasks = [
  {
    task_description: "put together basics for the scheme of the website",
    task_notes:
      "website should have dedicated backend with RESTful API structure",
    project_id: 1,
  },
  { task_description: "build best quality front end and UI", project_id: 1 },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("projects").insert(projects);
  await knex("resources").insert(resources);
  await knex("tasks").insert(tasks);
};
