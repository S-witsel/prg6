

const Curseditem = require("../models/CursedItemModel");
const mongoose = require("mongoose");
const dev = require("../package.json");

const curseditems = [
    new Curseditem({
        itemName: "Spyglass",
        itemDescription: "a spyglass about 2 meters long",
        blessing: "Shows you the way home",
        curse: "But its not YOUR home",
    }),]
//connect mongoose
mongoose
    .connect(String(dev.db), { useNewUrlParser: true })
    .catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then(() => {
        console.log("connected to db in development environment");
    });

curseditems.map(async (p, index) => {
    await p.save((err, result) => {
        if (index === curseditems.length - 1) {
            console.log("DONE!");
            mongoose.disconnect();
        }
    });
});