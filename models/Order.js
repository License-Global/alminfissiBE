const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderName: {
    type: String,
    required: true,
    unique: true,
  },
  materialShelf: {
    type: String,
    required: true,
    unique: false,
  },
  accessori: {
    type: String,
    required: true,
  },
  urgency: {
    type: String,
    required: true,
  },
  orderManager: {
    type: String,
    required: true,
  },
  activity: {
    ricezioneAccessori: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },

      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    ricezioneAlluminio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },

      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    ricezioneVetri: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    taglio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    lavorazione: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    assemblaggio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    installazioneVetri: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    imballaggio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    trasporto: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
    consegnaInstallazione: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        default: "Standby",
        enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
      },
      target: {
        type: String,
        enum: ["ok", "anticipo", "ritardo"],
      },
      activityManager: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: false,
        default: "",
      },
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
