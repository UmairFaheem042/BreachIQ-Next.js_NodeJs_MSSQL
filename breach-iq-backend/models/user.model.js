import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    oauthProvider: { // e.g. 'google', 'github', or null for normal login
        type: DataTypes.STRING,
        allowNull: false
    },
    oauthId: { // ID provided by OAuth provider
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'Users',
    timestamps: false
})

export default User;