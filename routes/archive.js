const express = require("express");
const mongoose = require("mongoose");
const Archived = require("../models/Archived");
const Order = require("../models/Order");
const router = express.Router();

// Funzione per spostare l'ordine negli archivi
const moveOrderToArchive = async (orderId) => {
  try {
    console.log(
      `Iniziando il processo di archiviazione per l'ordine ${orderId}`
    );

    // Trova l'ordine nella collezione ORDERS
    console.log(`Ricerca dell'ordine ${orderId}`);
    const order = await Order.findById(orderId).lean();
    if (!order) {
      console.log(`Ordine ${orderId} non trovato`);
      throw new Error("Ordine non trovato");
    }

    // Crea un nuovo documento nella collezione ARCHIVE con i dati dell'ordine
    console.log(`Archiviazione dell'ordine ${orderId}`);
    const archivedOrder = new Archived(order);
    await archivedOrder.save();
    console.log(`Ordine ${orderId} archiviato con successo`);
  } catch (error) {
    console.error("Error moving order to archive:", error);
    throw error; // Rilancia l'errore per essere gestito nel router
  }
};

// Route per archiviare un ordine
router.post("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    console.log(`Richiesta di archiviazione per l'ordine ${orderId}`);
    await moveOrderToArchive(orderId);
    await Order.findByIdAndDelete(orderId);
    console.log(`Ordine ${orderId} eliminato dalla collezione ORDERS`);
    res.status(200).send(`Ordine ${orderId} archiviato con successo`);
  } catch (error) {
    console.error(
      `Errore durante l'archiviazione dell'ordine ${orderId}:`,
      error.message
    );
    if (error.message === "Ordine non trovato") {
      res.status(404).send(error.message);
    } else {
      res
        .status(500)
        .send("Errore durante l'archiviazione dell'ordine: " + error.message);
    }
  }
});

router.patch("/:orderId/:activityField/note", async (req, res) => {
  try {
    const { orderId, activityField } = req.params;
    const { content } = req.body;

    // Verifica se l'ID è valido
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.log(`Invalid ID: ${orderId}`); // Log per debug
      return res.status(400).send("ID non valido");
    }

    // Verifica se il contenuto della nota è presente
    if (!content) {
      return res.status(400).send("Content is required");
    }

    // Costruisci il percorso del campo dinamicamente per aggiungere la nota
    const updatePath = `activity.${activityField}.note`;

    // Crea un oggetto per aggiungere la nuova nota
    const newNote = {
      date: new Date(),
      content: content,
    };

    // Esegui l'aggiornamento
    const updatedDoc = await Archived.findByIdAndUpdate(
      orderId,
      { $push: { [updatePath]: newNote } },
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

// Route per recuperare tutti gli ordini archiviati
router.get("/", async (req, res) => {
  try {
    console.log("Richiesta di recupero di tutti gli ordini archiviati");
    const archivedOrders = await Archived.find().lean();
    res.status(200).send(archivedOrders);
  } catch (error) {
    console.error(
      "Errore durante la ricerca degli ordini archiviati:",
      error.message
    );
    res.status(500).send("Errore durante la ricerca degli ordini archiviati");
  }
});

// Route per recuperare un ordine archiviato specifico
router.get("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    console.log(`Richiesta di recupero dell'ordine archiviato ${orderId}`);
    const archivedOrder = await Archived.findById(orderId).lean();
    if (!archivedOrder) {
      throw new Error("Ordine archiviato non trovato");
    }
    res.status(200).send(archivedOrder);
  } catch (error) {
    console.error(
      `Errore durante la ricerca dell'ordine archiviato ${orderId}:`,
      error.message
    );
    if (error.message === "Ordine archiviato non trovato") {
      res.status(404).send(error.message);
    } else {
      res.status(500).send("Errore durante la ricerca dell'ordine archiviato");
    }
  }
});

// Route per eliminare un ordine archiviato
router.delete("/:id", async (req, res) => {
  const orderId = req.params.id;
  try {
    console.log(`Richiesta di eliminazione dell'ordine archiviato ${orderId}`);
    const deletedOrder = await Archived.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      throw new Error("Ordine archiviato non trovato");
    }
    res.status(200).send(`Ordine archiviato ${orderId} eliminato con successo`);
  } catch (error) {
    console.error(
      `Errore durante l'eliminazione dell'ordine archiviato ${orderId}:`,
      error.message
    );
    if (error.message === "Ordine archiviato non trovato") {
      res.status(404).send(error.message);
    } else {
      res
        .status(500)
        .send("Errore durante l'eliminazione dell'ordine archiviato");
    }
  }
});

module.exports = router;
