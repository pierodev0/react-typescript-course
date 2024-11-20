import { body, param } from "express-validator";

export const validationRules = {
  product: [
    body("name")
      .notEmpty()
      .withMessage("El nombre de Producto no puede ir vacio"),

    body("price")
      .isNumeric()
      .withMessage("El precio debe ser un valor numerico")
      .notEmpty()
      .withMessage("El precio no puede ir vacio")
      .custom((value) => value > 0)
      .withMessage("El precio debe ser un valor numerico mayor a 0"),
    // body("availability").isBoolean().withMessage("Disponibilidad no válida"),
  ],
  productId: [param("id").isInt().withMessage("Id no valido")],
};
