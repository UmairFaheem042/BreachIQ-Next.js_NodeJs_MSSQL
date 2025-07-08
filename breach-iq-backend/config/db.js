import { Sequelize } from 'sequelize';
import { db_host, db_name, db_password, db_user } from '../lib/constants.js';

const sequelize = new Sequelize(
    db_name,
    db_user,
    db_password,
    {
        host: db_host, // UmairFaheem
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false, // set true if using Azure
                trustServerCertificate: true,
                enableArithAbort: true
            }
        },
        logging: false // set true if you want to see raw SQL queries
    }
);

export default sequelize;
