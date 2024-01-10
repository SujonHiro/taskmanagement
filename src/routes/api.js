const express= require("express")
const UserController = require("../controller/userController");
const Authentication=require("../middleware/AuthVerification")
const taskController = require("../controller/taskController");
const router=express.Router()



router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.post("/profile-update",Authentication,UserController.profileUpdate)

router.post("/createTask",Authentication,taskController.createTask)
router.get("/deleteTask/:id",Authentication,taskController.deleteTask)
router.get("/updateTask/:id/:status",Authentication,taskController.updateTask)
router.get("/taskListByStatus/:status",Authentication,taskController.taskListByStatus)
router.get("/taskStatusCount",Authentication,taskController.taskStatusCount)

module.exports=router;