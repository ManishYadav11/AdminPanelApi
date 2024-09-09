const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Role = require('./roleModel');

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {  // Changed from `role` to `roleId`
        type: DataTypes.UUID, // Assuming Role ID is UUID
        allowNull: false,
        references: {
            model: 'Roles', // Table name in the database
            key: 'id' // Primary key of the Role table
        }
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    paranoid: true, // Enables soft deletes
    timestamps: true // Enables createdAt and updatedAt fields
});

// Define associations
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

module.exports = User;
