const { Sequelize } = require("sequelize");
require("dotenv").config();

describe("Database Connection", () => {
  let sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        logging: false, 
      }
    );
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Debe conectarse correctamente a la base de datos", async () => {
    try {
      await sequelize.authenticate();
      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
