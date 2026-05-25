const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json("Server is running...");
})

// Public route for authentication
app.use("/api/auth", authRouter);


module.exports  = app;
