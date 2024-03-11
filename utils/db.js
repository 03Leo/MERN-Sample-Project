const mongoose = require("mongoose");

const URI = "mongodb+srv://cluster0.twczofc.mongodb.net/mern_admin";
// mongoose.connect(URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successful to DB");
    } catch (error) {
        console.error("database connection failed");
        process.exit(0);
    }
};


module.exports = connectDb;