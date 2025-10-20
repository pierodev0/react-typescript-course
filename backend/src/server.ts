import express from "express";
import router from "./routes";
import db from "./config/db";
import chalk from "chalk";
//Conectar a bd
async function connectDB() {
  try {
    await db.authenticate();
    db.sync()
    console.log(chalk.green("Conexion exitosa a la BD"))
  } catch (error) {
    console.log(error);
    console.log(chalk.red("Hubo un error al conectar a la BD"));
  }
}
connectDB()
const server: express.Application = express();
//Leer datos de formularios
server.use(express.json())
server.use("/api/products", router);
export { server };
