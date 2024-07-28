var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");

const Personale = require("../models/Personale");

router.get("/", async (req, res) => {
  try {
    const personale = await Personale.find();
    res.json(personale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore del server" });
  }
});

router.get("/:personaleId", async (req, res) => {
  try {
    const personaleId = req.params.personaleId;
    console.log(`Fetching personale with ID: ${personaleId}`);
    const personale = await Personale.findById(personaleId);

    if (!personale) {
      console.log(`Personale ID: ${personaleId} not found`);
      return res.status(404).json({ message: "Dipendente non trovato" });
    }

    res.json(personale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore del server" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { workerName } = req.body;
    const personale = new Personale({
      workerName,
    });
    console.log("Creating new emp:", personale);
    await personale.save();
    res.status(201).json(personale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

router.delete("/:personaleId", async (req, res) => {
  try {
    const personaleId = req.params.personaleId;

    // Verifica se l'ID è valido
    if (!mongoose.Types.ObjectId.isValid(personaleId)) {
      console.log(`Invalid ID: ${personaleId}`); // Log per debug
      return res.status(400).send("ID non valido");
    }

    // Esegui l'eliminazione
    const deletedDoc = await Personale.findByIdAndDelete(personaleId);

    if (!deletedDoc) {
      console.log(` Emp ID: ${personaleId} not found for deletion`); // Log per debug
      return res.status(404).send("Documento non trovato");
    }

    res.send(deletedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
