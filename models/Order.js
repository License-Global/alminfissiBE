const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  orderName: {
    type: String,
    required: true,
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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

      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
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
      note: [
        {
          date: { type: Date, default: Date.now, required: false },
          content: { type: String, required: false },
        },
      ],
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
