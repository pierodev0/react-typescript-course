import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
  res.send("Hola mundo");
});
router.post("/", (req, res) => {
  res.send("Hola mundo en post");
});
router.put("/", (req, res) => {
  res.send("Hola mundo en put");
});
router.patch("/", (req, res) => {
  res.send("Hola mundo en patch");
});
router.delete("/", (req, res) => {
  res.send("Hola mundo en delete");
});

export default router