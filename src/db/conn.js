const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/database").then(() => {
    console.log(`connection successfull to database`);
}).catch((e) => {
    console.log(e);
})