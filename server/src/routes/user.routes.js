import { Router } from "express";
import { logOutUser, loginUser,registerUser,verifyLogin} from "../controlers/user.js";



const router = Router()

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/verify").get(verifyLogin);


//secured routes
router.route("/logout").post(verifyLogin,logOutUser)
export default router




