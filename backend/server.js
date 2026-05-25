require('dotenv').config();

const connectToDB = require('./src/config/db');

const app = require('./src/app');

connectToDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


