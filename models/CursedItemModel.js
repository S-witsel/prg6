import mongoose from "mongoose";

const CursedItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemDescription: { type: String, required: true },
    blessing: { type: String, required: true },
    curse: { type: String, required: true }
});

CursedItemSchema.virtual('links').get(function () {
    return { self: `curseditems/${this._id}` };
});

const CursedItem = mongoose.model("CursedItem", CursedItemSchema);

export default CursedItem;

