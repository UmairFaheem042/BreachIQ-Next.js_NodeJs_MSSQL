// backend/config/testConnection.js
import sequelize from '../config/db.js';

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();
