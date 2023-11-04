const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');

const dotenv = require("dotenv");
dotenv.config();

// CREATE OUR SERVER
const PORT = process.env.PORT || 8080;
const app = express();

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
// const authRouter = require('./routes/auth-router')
// app.use('/auth', authRouter)

const apiRouter = require('./routes/api-router')
app.use('/api', apiRouter)

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if (process.env.ENVIRONMENT === "PRODUCTION") {
    const options = {
        key: fs.readFileSync('../ssl/privkey.pem'),
        cert: fs.readFileSync('../ssl/fullchain.pem'),
    };

    const httpApp = http.createServer(app);
    const httpsApp = https.createServer(options, app).listen(PORT, () => {
        console.log("Express server listening on port " + PORT);
    });
} else if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    // PUT THE SERVER IN LISTENING MODE
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`))
}
