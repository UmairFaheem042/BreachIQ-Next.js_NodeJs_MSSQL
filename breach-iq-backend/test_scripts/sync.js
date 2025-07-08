// for testing purpose

import sequelize from '../config/db.js';
import User from '../models/user.model.js';
import TrackedEmail from '../models/trackEmail.model.js';
import Breach from '../models/breach.model.js';
import OAuthAccount from '../models/oauth.model.js';
import BreachHistory from '../models/breachHistory.model.js';
// import other models if needed

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        await sequelize.sync({ alter: true, force: true }); // use { force: true } to drop and recreate tables
        console.log('All models synchronized successfully.');
    } catch (error) {
        console.error('Database sync failed:', error);
    }
};

syncDatabase();
