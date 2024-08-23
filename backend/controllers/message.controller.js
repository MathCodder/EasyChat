import Message from "../models/Message.js";
import User from "../models/User.js";

export const postMessage = async (req, res) => {
  try {
    console.log(req.user);

    const { content } = req.body;
    const senderId = req.user?.id;

    if (!content) {
      return res
        .status(400)
        .json({ error: "le contenu du message est requis" });
    }

    const newMessage = await Message.create({
      senderId,
      content,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Erreur lors de l'envoie du message", error);
    res.status(500).json({ error: "Erreur interne au serveur" });
  }
};

export const getMessage = async (req, res) => {
  try {
    console.log("Get Message");
    const messages = await Message.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Erreur lors de la récuperation des messages", error);
    res.status(500).json({ error: "Erreur interne au Serveur" });
  }
};
