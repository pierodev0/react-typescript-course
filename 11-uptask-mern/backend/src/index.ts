import chalk from "chalk";
import app from "./server";

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(chalk.cyan.bold("REST api en el puerto :"), port);
});
