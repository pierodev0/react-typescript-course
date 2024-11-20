import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";
import { validationRules } from "./validators";

const router: Router = Router();
//Routing
router.get("/", getProducts);

router.get(
  "/:id",
  validationRules.productId,
  handleInputErrors,
  getProductById
);
router.put("/:id", validationRules.product, handleInputErrors, updateProduct);
router.patch(
  "/:id",
  validationRules.productId,
  handleInputErrors,
  updateAvailability
);
router.post("/", validationRules.product, handleInputErrors, createProduct);
router.delete(
  "/:id",
  validationRules.productId,
  handleInputErrors,
  deleteProduct
);
export default router;
