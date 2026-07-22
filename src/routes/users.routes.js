import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();
// crud basico
router.get("/", userController.getAllUsers);

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`user with id ${id} found`);
});

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  res.send(`user created : ${name} ${email}`);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  res.send(`user with id ${id} updated : ${name} ${email} ${password}`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`user with id ${id} deleted`);
});

export default router;
