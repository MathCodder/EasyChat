import { DataTypes } from "sequelize";
import { sequelize } from "../db/connectToMySqlDB.js";
import User from "./User.js";

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      references: {
        model: User,
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "message",
    timestamps: true,
  }
);

User.hasMany(Message, { foreignKey: "senderId" });
Message.belongsTo(User, { foreignKey: "senderId" });

export default Message;
