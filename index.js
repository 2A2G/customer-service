const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./src/config/dbConfig');
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

sequelize.sync({ force: true }) 
    .then(() => console.log("Base de datos sincronizada"))
    .catch((error) => console.error("Error al sincronizar la base de datos", error));


app.listen(PORT, () => {
  console.log(`Customer Service Corriendo en el Puerto ${PORT}`);
});