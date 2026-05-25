const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please fill a valid email address",
    ],
    unique: true,
    index: true,
  },
  name:{
    type: String,
    trim: true,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  role:{
    type: String,
    enum: ["General User", "Admin"],
    default: "General User",
    immutable: true,
  }
}, {
  timestamps: true
});


userSchema.pre("save", async function (next){
    if (!this.isModified("password")) {
        return;
    }
    
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    
    return;
});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;