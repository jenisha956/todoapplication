import express from "express";
import Todo from "../model/TodoModel.js";
import { addTodo, getTodo,deleteTodo,updateTodo} from "../controllers/todoControllers.js";




 const router=express.Router();

router.route("/").get(getTodo).post(addTodo);
router.route("/:id").delete(deleteTodo).patch(updateTodo);

  export default router;