import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import TrackedEmail from "./trackEmail.model.js";

const Breach = sequelize.define('Breach', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tracked_email_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    breach_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    breach_date: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Breaches',
    timestamps: false
})

// Relationship: TrackedEmail has many Breaches

Breach.belongsTo(TrackedEmail, { foreignKey: 'tracked_email_id', onDelete: 'CASCADE' });
TrackedEmail.hasMany(Breach, { foreignKey: 'tracked_email_id', onDelete: 'CASCADE' });

export default Breach;