const {Router} = require("express")

const UsersController = require("../controllers/usersController")

const usersRoutes = Router()

const userController = new UsersController()

usersRoutes.post("/", userController.create)
usersRoutes.put("/:id", userController.update)

module.exports = usersRoutes