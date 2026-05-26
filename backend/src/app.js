const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const authRouter = require('./routes/auth.routes');
const recordsRouter = require('./routes/records.routes');
const userRouter = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    origin = 'https://angular-rbac-records-dashboard.vercel.app/',
    credentials = true,
    methods = ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders = ['Content-Type', 'Authorization']
));


app.get('/', (req, res) => {
    res.status(200).json("Server is running...");
})

// Public route for authentication
app.use("/api/auth", authRouter);

app.use("/api/records", recordsRouter);

// Protected admin routes
app.use("/api/admin/users", userRouter);

module.exports  = app;
