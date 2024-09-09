const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Define the AuditLog model
const AuditLog = sequelize.define('AuditLog', {
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    performedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetResource: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
}, {
    // Model options
    timestamps: true, 
    tableName: 'audit_logs', 
    underscored: true, 
});

module.exports = AuditLog;
