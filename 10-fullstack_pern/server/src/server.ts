import express, { Express } from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

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

//Instancia de express
const server: Express = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === undefined || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  },
};

server.use(cors(corsOptions));

//Leer datos de formularios
server.use(express.json());

server.use(morgan("dev"));
server.use("/api/products", router);

export default server;
