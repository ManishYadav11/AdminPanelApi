const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Define the Project model
const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, 
    },
    createdBy: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    assignedTo: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: true, 
    },
    deletedAt: {
        type: DataTypes.DATE, 
        allowNull: true, 
    },
}, {
    // Model options
    timestamps: true, 
    paranoid: true, 
    tableName: 'projects', 
    underscored: true,
});

// Export the model
module.exports = Project;
