import express from "express";
import UserController from "../controllers/user.controller.js";
import upload from "../config/multer.js";

const router = express.Router();
// crud basico
router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.post("/", UserController.createUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

router.post(
  "/:id/documents",
  upload.single("document"),
  UserController.addDocument,
);

export default router;
