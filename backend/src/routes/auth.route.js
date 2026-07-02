// We are using this for creating api not for logic , logic in the controller file
const { Router } = require("express")
const authController = require("../controllers/auth.contoller")
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

authRouter.post("/register", authController.registerUserController)
authRouter.post("/login", authController.loginUserController)
authRouter.post("/logout", authController.logoutController)
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)

module.exports=authRouter