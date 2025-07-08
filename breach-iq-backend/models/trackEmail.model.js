import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const TrackedEmail = sequelize.define('TrackedEmail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    email_to_track: {
        type: DataTypes.STRING, // reference
        allowNull: false
    },
    last_checked: {
        type: DataTypes.DATE
    },
    breach_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    tableName: 'TrackedEmails',
    timestamps: false,

});

TrackedEmail.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', unique: true });
User.hasOne(TrackedEmail, { foreignKey: 'user_id', onDelete: 'CASCADE' });



export default TrackedEmail;