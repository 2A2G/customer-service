const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');


const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type_identity: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  number_identity: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
}, {
  tableName: 'customers',
  timestamps: true
});


module.exports = Customer;