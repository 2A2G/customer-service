const CustomerController = require("../src/controllers/customerController");
const {getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require("../src/services/customerService");

jest.mock("../src/services/customerService"); 

describe("Customer Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("Debe devolver todos los clientes", async () => {
    const mockCustomers = [
      { id: 1, first_name: "Carlos", last_name: "Pérez" },
    ];
    getAllCustomers.mockResolvedValue(mockCustomers);

    await CustomerController.getAllCustomers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockCustomers);
  });

  it("Debe manejar errores correctamente", async () => {
    getAllCustomers.mockRejectedValue(new Error("Error de base de datos"));

    await CustomerController.getAllCustomers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error de base de datos" });
  });
});
