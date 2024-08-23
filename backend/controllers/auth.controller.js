import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "User non trouvé " });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Mot de passe incorect " });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Connexion reussi",
      user: {
        id: user.id,
        username: user.username,
        gender: user.gender,
      },
      token,
    });
  } catch (error) {
    console.log("Erreur de connexion", error);
    res.status(500).json({ error: "Erreur interne au Serveur" });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, confirmedPassword, gender } = req.body;

    if (password !== confirmedPassword) {
      return res
        .status(400)
        .json({ error: "Les mots de passe ne sont pas identiques" });
    }
    const user = await User.findOne({ where: { username } });

    if (user) {
      return res
        .status(400)
        .json({ error: "Le pseudo est déjà connu dans la base de donnée" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      gender: newUser.gender,
    });
  } catch (error) {
    console.log("Erreur dans le controllers auth", error);
    res.status(500).json({ error: "Erreur interne au serveur" });
  }
};
