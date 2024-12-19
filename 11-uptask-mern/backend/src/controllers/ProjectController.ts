import { Response, Request } from "express";
import Project from "../models/Project";

export class ProjectController {
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id).populate("tasks");

      if (!project) {
        const error = new Error("Projecto no encontrado");
        res.status(404).json({
          error: error.message,
        });
        return;
      }

      res.json(project);
    } catch (error) {
      console.log(error);
    }
  };

  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();

      res.status(201).json(project);
    } catch (error) {
      console.log(error);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findByIdAndUpdate(id, req.body);

      if (!project) {
        const error = new Error("Projecto no encontrado");
        res.status(404).json({
          error: error.message,
        });
        return;
      }

      res.json({
        id: project.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Projecto no encontrado");
        res.status(404).json({
          error: error.message,
        });
        return;
      }
      await project.deleteOne();
      res.send({
        id: project.id,
        msg: "Proyecto eliminado",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
