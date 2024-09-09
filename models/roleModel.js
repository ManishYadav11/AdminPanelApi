const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Define the Role model
const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    permissions: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    tableName: 'Roles', // Explicitly set the table name
    underscored: true, // Use snake_case for column names
});

// Export the Role model
module.exports = Role;
