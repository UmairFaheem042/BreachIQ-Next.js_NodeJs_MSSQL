import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";

const OAuthAccount = sequelize.define('OAuthAccount', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    providerId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "OAuthAccounts",
    timestamps: false
})

// Relationship
OAuthAccount.belongsTo(User, { foreignKey: "user_id", onDelete: 'CASCADE' });
User.hasOne(OAuthAccount, { foreignKey: "user_id", onDelete: 'CASCADE' });

export default OAuthAccount;