const sequelize = require("../src/config/dbConfig");
const { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require("../src/services/customerService");
const { Customer } = require('../src/models/customerModel'); 

beforeAll(async () => {
  await sequelize.sync({ force: false });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Customer Service", () => {
  beforeEach(async () => {
    await Customer.destroy({ where: {} });
  });

  it("Debe crear un nuevo cliente", async () => {
    const req = {
      params: {},
      body: {
        user_id: 1,
        type_identity: "CC",
        number_identity: "8768678768768",
        first_name: "Carlos",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
      }
    };

    const response = await createCustomer(req);
    expect(response).toBeDefined();
    expect(response.message).toBe("Customer creado correctamente");
  });

  it("Debe obtener todos los clientes", async () => {
    const req = {
      params: {},
      body: {
        user_id: 1,
        type_identity: "CC",
        number_identity: "43643235123364",
        first_name: "Carlos",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
      }
    };

    await createCustomer(req);

    const customers = await getAllCustomers();
    expect(customers.length).toBeGreaterThan(0);
  });
});
