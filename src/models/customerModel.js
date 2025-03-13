const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo user_id no puede ser nulo"
      }
    }
  },
  type_identity: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo type_identity no puede ser nulo"
      }
    }
  },
  number_identity: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
      msg: "El número de identificación ya existe"
    },
    validate: {
      notNull: {
        msg: "El campo number_identity no puede ser nulo"
      } 
    }
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo first_name no puede ser nulo"
      } 
    }
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo last_name no puede ser nulo"
      } 
    }
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo phone_number no puede ser nulo"
      } 
    }
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo birthdate no puede ser nulo"
      }
    }
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      notNull: {
        msg: "El campo gender no puede ser nulo"
      } 
    }
  },
}, {
  tableName: 'customers',
  timestamps: true
});

module.exports = { Customer };