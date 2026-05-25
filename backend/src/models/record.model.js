const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type:String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
})

const recordModel = mongoose.model("Record", recordSchema);

module.exports = recordModel;