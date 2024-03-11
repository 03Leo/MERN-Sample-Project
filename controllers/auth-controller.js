const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const home = async (req, res) => {
    try {
        res.status(200).send("Hi This is Hritik Jaiswal. Now using authcontroller");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);

        const {firstName, lastName, emailId, password, confirmPassword} = req.body;

        const userExist = await User.findOne({emailId});

        if (userExist){
            return res.status(400).json({message: "user already exists"});
        }

        if (password!=confirmPassword){
            return res.status(400).json({message: "password mismatch"});
        }

        const salt = 10;
        const hash_password = await bcrypt.hash(password, salt);
        const hash_confirmPassword = await bcrypt.hash(confirmPassword, salt);

        const userCreated = await User.create({firstName, lastName, emailId, password:hash_password, confirmPassword:hash_confirmPassword});

        res.status(201).json({message: "Registration Successful", token: await userCreated.generateToken(), userId: userCreated._id.toString(), });
    } catch (error) {
        res.status(500).json("internal server error");
    }
}

module.exports = {home, register};