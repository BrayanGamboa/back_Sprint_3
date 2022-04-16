const express = require("express");
const app = express();
require("dotenv").config();

//Configuraciones
app.set("port", process.env.PORT || 4000);

//Middlewars
app.use(express.json());

//Routes
app.use(require("./routes/routs"));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor corriendo en el puerto ${app.get("port")}`);
});