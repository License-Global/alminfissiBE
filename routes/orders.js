var express = require("express");
var router = express.Router();
const mongoose = require("mongoose"); // Aggiunto
const Order = require("../models/Order");

// Route per ottenere un singolo ordine
router.get("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    console.log(`Fetching order with ID: ${orderId}`); // Log per debug
    const order = await Order.findById(orderId);

    if (!order) {
      console.log(`Order with ID: ${orderId} not found`); // Log per debug
      return res.status(404).json({ message: "Ordine non trovato" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore del server" });
  }
});

// Route PATCH per aggiornare la nota di un ordine
router.patch("/:orderId/:activityField/note", async (req, res) => {
  try {
    const { orderId, activityField } = req.params;
    const { note } = req.body;

    // Verifica se l'ID è valido
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.log(`Invalid ID: ${orderId}`); // Log per debug
      return res.status(400).send("ID non valido");
    }

    // Costruisci il percorso del campo dinamicamente
    const updatePath = `activity.${activityField}.note`;

    // Crea un oggetto per aggiornare il campo dinamicamente
    const updateObject = {};
    updateObject[updatePath] = note;

    // Esegui l'aggiornamento
    const updatedDoc = await Order.findByIdAndUpdate(
      orderId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedDoc) {
      console.log(`Order with ID: ${orderId} not found for update`); // Log per debug
      return res.status(404).send("Documento non trovato");
    }

    res.send(updatedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.patch("/:orderId/:activityField/status", async (req, res) => {
  try {
    const { orderId, activityField } = req.params;
    const { status } = req.body;

    // Verifica se l'ID è valido
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.log(`Invalid ID: ${orderId}`); // Log per debug
      return res.status(400).send("ID non valido");
    }

    // Costruisci il percorso del campo dinamicamente
    const updatePath = `activity.${activityField}.status`;

    // Crea un oggetto per aggiornare il campo dinamicamente
    const updateObject = {};
    updateObject[updatePath] = status;

    // Esegui l'aggiornamento
    const updatedDoc = await Order.findByIdAndUpdate(
      orderId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedDoc) {
      console.log(`Order with ID: ${orderId} not found for update`); // Log per debug
      return res.status(404).send("Documento non trovato");
    }

    res.send(updatedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.patch("/:orderId/:activityField/completed", async (req, res) => {
  try {
    const { orderId, activityField } = req.params;
    const { completed } = req.body;

    // Verifica se l'ID è valido
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.log(`Invalid ID: ${orderId}`); // Log per debug
      return res.status(400).send("ID non valido");
    }

    // Costruisci il percorso del campo dinamicamente
    const updatePath = `activity.${activityField}.completed`;

    // Crea un oggetto per aggiornare il campo dinamicamente
    const updateObject = {};
    updateObject[updatePath] = completed;

    // Esegui l'aggiornamento
    const updatedDoc = await Order.findByIdAndUpdate(
      orderId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedDoc) {
      console.log(`Order with ID: ${orderId} not found for update`);
      return res.status(404).send("Documento non trovato");
    }

    res.send(updatedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Route PUT per aggiornare un ordine
router.patch("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const {
      orderName,
      materialShelf,
      accessori,
      urgency,
      orderManager,
      activity,
    } = req.body;

    // Verifica se l'ID è valido
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.log(`Invalid ID: ${orderId}`); // Log per debug
      return res.status(400).send("ID non valido");
    }

    // Costruisci l'oggetto di aggiornamento
    const updateObject = {
      orderName,
      materialShelf,
      accessori,
      urgency,
      orderManager,
      activity: {
        ricezioneAccessori: activity.ricezioneAccessori,
        ricezioneAlluminio: activity.ricezioneAlluminio,
        ricezioneVetri: activity.ricezioneVetri,
        taglio: activity.taglio,
        lavorazione: activity.lavorazione,
        assemblaggio: activity.assemblaggio,
        installazioneVetri: activity.installazioneVetri,
        imballaggio: activity.imballaggio,
        trasporto: activity.trasporto,
        consegnaInstallazione: activity.consegnaInstallazione,
      },
    };

    // Esegui l'aggiornamento
    const updatedDoc = await Order.findByIdAndUpdate(
      orderId,
      { $set: updateObject },
      { new: true }
    );

    if (!updatedDoc) {
      console.log(`Order with ID: ${orderId} not found for update`); // Log per debug
      return res.status(404).send("Documento non trovato");
    }

    res.send(updatedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Route per ottenere tutti gli ordini
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Errore del server" });
  }
});

// Route POST per creare un nuovo ordine
router.post("/", async (req, res) => {
  try {
    const {
      orderName,
      materialShelf,
      accessori,
      urgency,
      orderManager,
      activity,
    } = req.body;

    const order = new Order({
      orderName,
      materialShelf,
      accessori,
      urgency,
      orderManager,
      activity: {
        ricezioneAccessori: activity.ricezioneAccessori,
        ricezioneAlluminio: activity.ricezioneAlluminio,
        ricezioneVetri: activity.ricezioneVetri,
        taglio: activity.taglio,
        lavorazione: activity.lavorazione,
        assemblaggio: activity.assemblaggio,
        installazioneVetri: activity.installazioneVetri,
        imballaggio: activity.imballaggio,
        trasporto: activity.trasporto,
        consegnaInstallazione: activity.consegnaInstallazione,
      },
    });

    console.log("Creating new order with data:", order); // Log per debug

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route DELETE per eliminare un ordine
router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Verifica se l'ID è valido
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.log(`Invalid ID: ${orderId}`); // Log per debug
      return res.status(400).send("ID non valido");
    }

    // Esegui l'eliminazione
    const deletedDoc = await Order.findByIdAndDelete(orderId);

    if (!deletedDoc) {
      console.log(`Order with ID: ${orderId} not found for deletion`); // Log per debug
      return res.status(404).send("Documento non trovato");
    }

    res.send(deletedDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
