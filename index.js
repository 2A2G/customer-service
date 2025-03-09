const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./src/config/dbConfig');
require("dotenv").config();
const Customer = require('./src/models/customerModel'); 
const PORT = process.env.PORT || 3000;


// app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const connectWithRetry = async (maxRetries = 5, delay = 5000) => {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully');
      
      await sequelize.sync({ force: true });
      console.log("Base de datos sincronizada con todos los modelos");
      return true;
    } catch (error) {
      retries++;
      console.log(`Connection attempt ${retries}/${maxRetries} failed: ${error.message}`);
      
      if (retries >= maxRetries) {
        console.error('Max retries reached. Could not connect to database.');
        throw error;
      }
      
      console.log(`Waiting ${delay/1000} seconds before retrying...`);
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
    console.error("Failed to start server:", error);
    process.exit(1); 
  }
};

startServer();