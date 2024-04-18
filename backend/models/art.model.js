const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const artrecordSchema = new mongoose.Schema({
    artName: { type: String, required: true },
    serial: { type: Number, required: true },
    src: { type: String, required: true },
    alt: String,
    bids: [{ user: { type: String, required: true }, bid: { type: Number, required: true } }]
});

// This Art creates the collection called artrecords in the artlist database
const Artmodel = mongoose.model("artrecords", artrecordSchema, "ArtList");
module.exports = Artmodel;

