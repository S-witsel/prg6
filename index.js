import express from 'express'

import mongoose from "mongoose";

import routes from "./routes/CuresdItemRoutes.js";

mongoose.connect('mongodb://localhost:27017/curseditems')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/curseditems', routes)

app.listen(8000);

app.get('/',(req, res) => {
    res.send('AAAAAAAAAAAAAA')
})