import express, { Express } from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";
const server: Express = express();

//Leer datos de formularios
server.use(express.json());

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Conexion exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();
server.use("/api/products", router);

export default server;
