const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./src/config/dbConfig');
require("dotenv").config();
const { Customer } = require('./src/models/customerModel'); 
const customerRoutes = require('./src/routes/customerRoutes');
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/customers', customerRoutes);

const connectWithRetry = async (maxRetries = 5, delay = 5000) => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Conexión a la base de datos establecida correctamente.');
      
      await sequelize.sync({ force: true });
      console.log("Base de datos sincronizada con todos los modelos");
      return true;
    } catch (error) {
      retries++;
      console.log(`Intentos de conexión ${retries}/${maxRetries} fallidos: ${error.message}`);
      
      if (retries >= maxRetries) {
        console.error('Demasiados intentos fallidos. Abortando...');
        throw error;
      }
      
      console.log(`Esperando ${delay/1000} segundos antes de volver a intentar...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const startServer = async () => {
  try {
    await connectWithRetry();
    
    app.listen(PORT, () => {
      console.log(`Customer Service Corriendo en el Puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); 
  }
};
startServer();

// if (require.main === module) {
//   startServer();
// }

module.exports = app;