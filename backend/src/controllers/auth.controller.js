const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


async function userRegisterController (req, res) {
    const {email, password, name} = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            message: "Email, password, and name are required"
        })
    }

    try {
        const isExists = await userModel.findOne({
            email: email
        })

        if (isExists) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const user = await userModel.create({
            email, password, name
        })

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});

        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully",
            user:{
                _id: user._id,
                email: user.email,
                name: user.name
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


module.exports = {
    userRegisterController

}