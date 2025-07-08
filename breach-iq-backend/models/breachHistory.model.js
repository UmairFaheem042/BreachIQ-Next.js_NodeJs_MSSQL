import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BreachHistory = sequelize.define('BreachHistory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tracked_email_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    checked_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    breach_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'BreachHistory',
    timestamps: false
});

export default BreachHistory;