const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    fullname : {
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
    }
});

const Registers = new mongoose.model("Registers", schema);

module.exports = Registers;