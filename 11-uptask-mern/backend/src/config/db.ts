import chalk from "chalk";
import { connect } from "mongoose";
export const connectDB = async () => {
  try {
    const { connection } = await connect(process.env.DATABASE_URL);
    const url = `${connection.host} : ${connection.port}`;
    console.log(chalk.magenta.bold(`MongoDB conectado en ${url}`));
  } catch (error) {
    console.log(chalk.bold.red("Error al conectar a MongoDB"));
    process.exit(1);
  }
};
