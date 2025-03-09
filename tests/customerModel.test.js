const sequelize = require("../src/config/dbConfig");
const Customer = require("../src/models/customerModel");

beforeAll(async () => {
  await sequelize.sync({ force: true }); 
});

afterAll(async () => {
  await sequelize.close(); 
});

describe("Customer Model", () => {
  it("Debe estar definido", () => {
    expect(Customer).toBeDefined();
  });

  it("Debe crear un nuevo cliente correctamente", async () => {
    const customer = await Customer.create({
        user_id: 1,
        type_identity: "DNI",
        number_identity: "12345678",
        first_name: "Carlos",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
    });

    expect(customer).toBeDefined();
    expect(customer.customer_id).toBeDefined(); 
    expect(customer.first_name).toBe("Carlos");
    expect(customer.last_name).toBe("Pérez");
    expect(customer.type_identity).toBe("DNI");
    expect(customer.number_identity).toBe("12345678");
    expect(customer.phone_number).toBe("123456789");
    expect(customer.birthdate).toEqual(new Date("1990-01-01"));
  });
});
