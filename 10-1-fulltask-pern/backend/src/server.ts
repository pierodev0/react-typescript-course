import express from "express";
import router from "./routes";
import db from "./config/db";
import chalk from "chalk";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
//Conectar a bd
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(chalk.green("Conexion exitosa a la BD"));
  } catch (error) {
    console.log(error);
    console.log(chalk.red("Hubo un error al conectar a la BD"));
  }
}
connectDB();
const server: express.Application = express();
//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
server.use(cors(corsOptions));
//Leer datos de formularios
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/products", router);
export { server };
