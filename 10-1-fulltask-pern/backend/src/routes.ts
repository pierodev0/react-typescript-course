import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handlerInputErrors } from "./middleware";
const router = Router();
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("Cambio"),
  handlerInputErrors,
  getProductById
);
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
router.put(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
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
  body("availability")
    .isBoolean()
    .withMessage("Valor de availability no valido"),
  handlerInputErrors,
  updateProduct
);
router.patch(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handlerInputErrors,
  updateAvailability
);
router.delete(
  "/:id",
  param("id").isInt().withMessage("Id no valido"),
  handlerInputErrors,
  deleteProduct
);

export default router;
