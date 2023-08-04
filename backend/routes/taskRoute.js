const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


router.route("/api/tasks").post(createTask);
router.route("/api/tasks").get(getAllTasks);
router.route("/api/tasks/:id").get(getTaskById);
router.route("/api/tasks/:id").patch(updateTask);
router.route("/api/tasks/:id").delete(deleteTask);


module.exports=router;