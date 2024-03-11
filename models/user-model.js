const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {type: String,require: true,},

    lastName: {type: String,require: true,},

    emailId: {type: String,require: true,},

    password: {type: String,require: true,},

    confirmPassword: {type: String,require: true,},

    isAdmin: {type: Boolean,default: false,},
});


userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            emailId: this.emailId,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error(error);
    }
};


const User = new mongoose.model("User", userSchema);


module.exports = User;