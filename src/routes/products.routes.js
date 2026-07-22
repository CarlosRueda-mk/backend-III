import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();
// crud basico despues queda mejorarlo
router.get("/", ProductController.getAllProducts);

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`product with id ${id} found`);
});

router.post("/", (req, res) => {
  const { name, price, description } = req.body;
  res.send(`product created`);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  res.send(`product updated`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`product`);
});

export default router;
