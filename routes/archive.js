var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Archived = require("../models/Archived");

const areAllActivitiesCompleted = (activities) => {
  return Object.values(activities).every(
    (activity) => activity.status === "Completato"
  );
};

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

    // Verifica che tutte le attività siano completate
    console.log(`Verifica delle attività per l'ordine ${orderId}`);
    if (!areAllActivitiesCompleted(order.activity)) {
      console.log(`Ordine ${orderId} non completato`);
      throw new Error(
        "Ordine non completato e quindi non può essere archiviato"
      );
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
    if (
      error.message ===
      "Ordine non completato e quindi non può essere archiviato"
    ) {
      res.status(400).send(error.message);
    } else if (error.message === "Ordine non trovato") {
      res.status(404).send(error.message);
    } else {
      res
        .status(500)
        .send("Errore durante l'archiviazione dell'ordine: " + error.message);
    }
  }
});

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
