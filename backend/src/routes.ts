import { Router } from "express";
import { createProduct, getProducts } from "./handlers/product";
import { body } from "express-validator";
import { handlerInputErrors } from "./middleware";
const router = Router();
router.get("/", getProducts);
router.post(
  "/",
  //Validacion
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio")
    .custom((value) => value > 0)
    .withMessage("Precio no valido"),
  handlerInputErrors,
  createProduct
);
router.put("/", (req, res) => {
  res.send("Hola mundo en put");
});
router.patch("/", (req, res) => {
  res.send("Hola mundo en patch");
});
router.delete("/", (req, res) => {
  res.send("Hola mundo en delete");
});

export default router;
