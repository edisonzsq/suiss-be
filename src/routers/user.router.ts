
import express from "express";
import { getAllUsers, createUser, dummy } from "../controllers/user.controller";
const router = express.Router();

// router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/", dummy)

export default router;