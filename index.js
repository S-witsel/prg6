import express from 'express'

import mongoose from "mongoose";

import routes from "./routes/CuresdItemRoutes.js";

mongoose.connect('mongodb://localhost:27017/curseditems')

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin (you can specify specific origins)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Specify allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Specify allowed headers
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/curseditems', routes)

app.listen(8000);

app.get('/',(req, res) => {
    res.send('AAAAAAAAAAAAAA')
})