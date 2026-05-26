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
                name: user.name,
                role: user.role
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function userLoginController (req, res) {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        })
    }

    try {
        const user = await userModel.findOne({
            email: email
        }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "Email or password is incorrect"
            })
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return res.status(400).json({
                message: "Email or password is incorrect"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});

        res.cookie("token", token);

        return res.status(200).json({
            message: "User logged in successfully",
            user:{
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function userLogoutController (req, res) {

    try {
        const cookie = req.cookies?.token;

        if (!cookie){
            return res.status(200).json({
                message: "User logged out successfully"
            })
        }

        res.clearCookie("token");
        return res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

module.exports = {
    userRegisterController
    , userLoginController
    , userLogoutController

}