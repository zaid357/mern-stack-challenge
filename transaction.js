const mongoose = require("mongoose");

const transactionSchema = mongoose.model("Transaction",{
    "title":String,
    "description":String,
    "price":Number,
    "dateOfSale":Date,
    "category":String,
    "sold":String
})

module.exports = transactionSchema;
