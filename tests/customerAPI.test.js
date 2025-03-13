const request = require("supertest");
const app = require("../index");
const sequelize = require("../src/config/dbConfig");
const { Customer } = require('../src/models/customerModel'); 

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Customer API", () => {
  beforeEach(async () => {
    await Customer.destroy({ where: {} });
  });

  it("Debe crear un nuevo cliente vía API", async () => {
    const newCustomer = {
      user_id: 1,
      type_identity: "DNI",
      number_identity: "34643667",
      first_name: "Carlos",
      last_name: "Pérez",
      phone_number: "123456789",
      birthdate: "1990-01-01",
      gender: "Masculino",
    };

    const res = await request(app).post("/customers").send(newCustomer);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Customer creado correctamente");
  });

  it("Debe obtener todos los clientes vía API", async () => {
    await Customer.create({
      user_id: 1,
      type_identity: "DNI",
      number_identity: "34643634",
      first_name: "Carlos",
      last_name: "Pérez",
      phone_number: "123456789",
      birthdate: new Date("1990-01-01"),
      gender: "Masculino",
    });

    const res = await request(app).get("/customers");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
