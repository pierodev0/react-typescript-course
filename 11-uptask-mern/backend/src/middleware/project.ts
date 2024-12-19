import { Response, Request, NextFunction } from "express";
import Project, { Iproject } from "../models/Project";

// Modificar el request
declare global {
  namespace Express {
    interface Request {
      project: Iproject;
    }
  }
}
export async function validateProjectExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("Projecto no encontrado");
      res.status(404).json({
        error: error.message,
      });
      return;
    }
    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({
      error: "Hubo un error",
    });
  }
}
