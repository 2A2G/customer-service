const sequelize = require("../src/config/dbConfig");
const { Customer } = require('../src/models/customerModel'); 

beforeAll(async () => {
  await sequelize.sync({ force: false }); 
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
        type_identity: "CC",
        number_identity: "12345678",
        first_name: "Carlos",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
    });

    expect(customer).toBeDefined();
    expect(customer.id).toBeDefined(); 
    expect(customer.first_name).toBe("Carlos");
    expect(customer.last_name).toBe("Pérez");
    expect(customer.type_identity).toBe("CC");
    expect(customer.number_identity).toBe("12345678");
    expect(customer.phone_number).toBe("123456789");
    expect(customer.birthdate).toEqual(new Date("1990-01-01"));
  });

  it("Debe fallar al crear un nuevo cliente sin campos requeridos", async () => {
    await expect(Customer.create({
        user_id: 2,
        type_identity: "CC",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
    })).rejects.toThrow();
  }
  );

  it("No debe permitir number_identity duplicados", async () => {
    await Customer.create({
        user_id: 3,
        type_identity: "CC",
        number_identity: "547547",
        first_name: "Carlos",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
    });

    await expect(Customer.create({
        user_id: 4,
        type_identity: "CC",
        number_identity: "547547",
        first_name: "Juan",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
    })).rejects.toThrow();
  });

  it("Debe actualizar un cliente correctamente", async () => {
    const customer = await Customer.create({
        user_id: 5,
        type_identity: "CC",
        number_identity: "3454353",
        first_name: "Carlos",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
    });

    customer.first_name = 'Juan';
    await customer.save();

    const updatedCustomer = await Customer.findByPk(customer.id);
    expect(updatedCustomer.first_name).toBe('Juan');
  });

  it("Debe eliminar un cliente correctamente", async () => {
    const customer = await Customer.create({
        user_id: 6,
        type_identity: "CC",
        number_identity: "1234567436368",
        first_name: "Carlos",
        last_name: "Pérez",
        phone_number: "123456789",
        birthdate: new Date("1990-01-01"),
        gender: "Masculino",
      });
      
      await customer.destroy();
      const deletedCustomer = await Customer.findByPk(customer.id);
      expect(deletedCustomer).toBeNull();
    });
});
