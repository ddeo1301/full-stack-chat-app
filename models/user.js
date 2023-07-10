const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', { // sequelize.define is used to define new model named 'user'. which
// returns a sequelize model class that represent 'user' model.
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,

    },

    phone:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
})

module.exports = User;
// code sets up User model with attribute and establishes the mapping between the model and underlying database table