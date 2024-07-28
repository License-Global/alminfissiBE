const mongoose = require("mongoose");

const personaleSchema = new mongoose.Schema({
  workerName: {
    type: String,
    required: true,
    unique: false,
  },
});

const Personale = mongoose.model("Personale", personaleSchema);

module.exports = Personale;
