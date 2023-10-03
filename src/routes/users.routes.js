const {Router} = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UsersController = require("../controllers/usersController")
const UserAvatarController = require("../controllers/userAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const userController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRoutes.post("/", userController.create)
usersRoutes.put("/", ensureAuthenticated, userController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes