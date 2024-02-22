const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String
    },
    email : {
        type: String,
    },
    phone : {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    dateOfDonation : {
        type: Date,
        required: true
    },
    timeOfDay: {
        type: Array,
        required: true
    },
    whatToDonate: {
        type: String,
        required: true
    }
});

const Contributors = new mongoose.model("Contributors", schema);

module.exports = Contributors;