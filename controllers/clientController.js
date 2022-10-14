const clientModel = require("../model/clientModel");
const { hashSync,compareSync} = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken');

// create validation schema object
const clientSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

exports.RegisterController = async (req, res) => {
    // ------ get user email and password
    const { email, password } = req.body;

    // ------ validate the schema of the data passed to the database
    const { error } = clientSchema.validate(req.body);
    if (error) {
        return res.status(404).json({ msg: error.message });
    }

    // ------ check if data was created already
    const userExist = await clientModel.findOne({ email: email });
    if (userExist) {
        return res.status(404).json({ msg: "User exist in database already" });
    }

    if (!error && !userExist) {
        const newUser = await clientModel.create({ email: email, password: hashSync(password, 10) });
        newUser.save();
        return res.status(200).json({ msg: "User created Successfully" });
    }
}

exports.LoginController = async (req, res) => {
    // validate the data of the schema
    const { error } = clientSchema.validate(req.body);
    if(error) return res.status(400).json({msg: error.message})

    const { email, password } = req.body;

    // check if user exist in database
    await clientModel.findOne({ email: email }).then((user) => {

        if (!user) {
            return res.status(400).json({ msg: "User is not found" });
        }

        // check if the password matches with the found user
        if (!compareSync(password,user.password)) {
            return res.status(404).json({ msg: "Password does not match" });
        }

        // if password matches we log user in and send a token to client
        const payload = {
            email: user.email,
            password: user.password,
        }

        const token = jwt.sign(payload, "Secret Key", { expiresIn: "1d" });
        return res.status(200).json({ msg: "Login Successfull", token: "Bearer " + token });
    }).catch((err) => {
        return res.status(404).json({ err });
    })

}