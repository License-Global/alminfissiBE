const mongoose = require("mongoose");

const archivedSchema = new mongoose.Schema({
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

      note: [
        {
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    ricezioneAlluminio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    ricezioneVetri: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    taglio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    lavorazione: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    assemblaggio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    installazioneVetri: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    imballaggio: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    trasporto: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
    consegnaInstallazione: {
      expire: { type: Date, default: Date.now, required: true },
      completed: { type: Date, default: null },
      status: {
        type: String,
        enum: ["Completato"],
        // default: "Standby",
        // enum: ["Lavorazione", "Standby", "Bloccato", "Completato"],
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
          date: { type: Date, default: Date.now, required: true },
          content: { type: String, required: true },
        },
      ],
    },
  },
});

const Archived = mongoose.model("Archived", archivedSchema);

module.exports = Archived;
