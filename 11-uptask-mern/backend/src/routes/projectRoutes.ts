import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router: Router = Router();
router.post(
  "/",
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del Projecto es Obligatorio"),
  body("clientName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del Cliente es Obligatorio"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion del projecto es Obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);
router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Id no valido"),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("Id no valido"),
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del Projecto es Obligatorio"),
  body("clientName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del Cliente es Obligatorio"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion del projecto es Obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("Id no valido"),
  handleInputErrors,
  ProjectController.deleteProject
);
// Routes for Tasks
router.post(
  "/:projectId/tasks",
  validateProjectExists,
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la tarea es Obligatorio"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  validateProjectExists,
  TaskController.getProjectTask
);
export default router;
