import { Router } from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
} from "../controllers/userController";

const router = Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.get("/all", getAllUsers);

export default router;
