const customerService = require("../services/customerService");

const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();
        console.log("Clientes obtenidos:", customers);
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).json({ message: error.message });
    }
}

const getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCustomer = async (req, res) => {
    try{
        const customer = await customerService.createCustomer(req);
        res.status(201).json(customer);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

const updateCustomer = async (req, res) => {
    try{
        const customer = await customerService.updateCustomer(req);
        res.status(200).json(customer);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

const deleteCustomer = async (req, res) => {
    try{
        const customer = await customerService.deleteCustomer(req);
        res.status(200).json(customer);
    } catch (error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
}