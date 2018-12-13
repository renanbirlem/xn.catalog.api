import mongoose from "mongoose";
import uuid from "uuid";

const schema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    client_id: { type: String, index: true, required: true },
    kind: {
        type: String,
        index: true,
        required: true
    },
    tree_id: {
        type: String,
        index: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String
    },
    priority: {
        type: Number,
        defaukt: 100
    },

    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    deleted_at: { type: Date, default: null }
});

export default connection => connection.model("Tree", schema);
