import server from "./server";
import colors from "colors";
const PORT = process.env.PORT || 4000;
console.clear();
server.listen(4000, () => {
  console.log(colors.cyan.bold(`REST API  en el puerto ${PORT}`));
});
