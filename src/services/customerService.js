const { Customer } = require("../models/customerModel");

const getAllCustomers = async () => {
    try {
        const customers = await Customer.findAll();
        return customers;
    } catch (error) {
        throw new Error(`Error al obtener los customers: ${error.message}`);
    }
}

const getCustomerById = async (id) => {
    try {
        const customer = await Customer.findByPk(id);
        return customer;
    } catch (error) {
        throw new Error(`Error al obtener el customers: ${error.message}`);
    }
}

const createCustomer = async (req) => {
    try {

        if(!Number.isInteger(Number(req.body.number_identity))){
            throw new Error('El número de identidad debe ser un entero');
        }

        const customer = await Customer.findOne({ where: { number_identity: req.body.number_identity } });
        if (customer) {
            throw new Error("El customer ya existe con este número de identidad");
        }

        await Customer.create({ 
            user_id: req.body.user_id,
            type_identity: req.body.type_identity,
            number_identity: req.body.number_identity,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            birthdate: req.body.birthdate,
            gender: req.body.gender
        });

        return { message: "Customer creado correctamente" };
    } catch (error) {
        throw new Error(`Error al crear el customer: ${error.message}`);
    }
}

const updateCustomer = async (req) => {
    try {
        if(!Number.isInteger(Number(req.body.number_identity))){
            throw new Error('El número de identidad debe ser un entero');
        }

        const customer = await Customer.findByPk(req.params.id);
        if(customer){
            await customer.update({
                user_id: req.body.user_id,
                type_identity: req.body.type_identity,
                number_identity: req.body.number_identity,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                birthdate: req.body.birthdate,
                gender: req.body.gender
            });
            return { message: "Customer actualizado correctamente" };
        } else {
            throw new Error("Customer no encontrado");
        }
    } catch (error) {
        throw new Error(`Error al actualizar el customer: ${error.message}`);
    }
}

const deleteCustomer = async (req) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if(customer){
            await customer.destroy();
            return { message: "Customer eliminado correctamente" };
        } else {
            throw new Error("Customer no encontrado");
        }
    } catch (error) {
        throw new Error(`Error al eliminar el customer: ${error.message}`);
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer, 
    updateCustomer,
    deleteCustomer
}