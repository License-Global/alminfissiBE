const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const cors = require("cors");

router.use(cors());

// Route per il login
router.post("/", async (req, res) => {
  const { role, password } = req.body;
  try {
    // Verifica se l'utente esiste nel database
    const user = await User.findOne({ role });
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Verifica se la password è corretta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password non valida" });
    }
    // Genera il token JWT
    const token = jwt.sign({ userId: user._id }, "segreto", {
      expiresIn: "8h",
    });

    // Invia il token come parte della risposta
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore durante il login" });
  }
});

// Route per ottenere un utente tramite ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Cerca l'utente nel database tramite ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    // Restituisci l'utente come parte della risposta
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore durante la ricerca dell'utente" });
  }
});

module.exports = router;
