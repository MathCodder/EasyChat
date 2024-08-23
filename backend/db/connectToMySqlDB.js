import { Sequelize } from "sequelize";

const sequelize = new Sequelize("easychat", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

const connectToMySqlDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion réussie à la base de données MySQL");
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
  }
};

export { sequelize, connectToMySqlDB };
