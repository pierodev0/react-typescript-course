import chalk from "chalk";
import { server } from "./server";
const port = process.env.PORT || 4000;
server.listen(port,()=> {
    console.log(chalk.green(`Rest api en el puerto ${port}`))
})