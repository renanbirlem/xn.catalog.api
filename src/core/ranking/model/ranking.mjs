import mongoose from "mongoose";
import uuid from "uuid";

const schema = new mongoose.Schema({
    _id: { type: String, default: uuid.v4 },
    client_id: {
        type: String,
        index: true,
        required: true
    },
    product_id: {
        type: String,
        index: true,
        required: true
    },
    sku: {
        type: String,
        index: true,
        required: true
    },
    price_to: {
        type: Number,
        required: true
    },
    price_discount_value: Number,
    price_discount_off: Number,
    trees: [
        {
            kind: String,
            tree_id: String,
            name: String
        }
    ],
    ranking_seen: { type: Number, index: true, default: 0 },
    ranking_cart: { type: Number, index: true, default: 0 },
    ranking_order: { type: Number, index: true, default: 0 },
    ranking_performance: { type: Number, index: true, default: 0 },
    ranking_best_seller: { type: Number, index: true, default: 0 },
    ranking_demand: { type: Number, index: true, default: 0 },
    days_as_new: { type: Number, index: true, default: null },
    is_new: { type: Boolean, index: true, default: false },
    is_promo: { type: Boolean, index: true, default: false },
    is_available: { type: Boolean, index: true, default: false },
    is_saleable: { type: Boolean, index: true, default: false },
    siblings: [
        {
            product_id: String,
            sku: String,
            ranking_cart: Number,
            ranking_order: Number,
            ranking_bought_together: Number,
            ranking_seen_bought: Number
        }
    ],

    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    deleted_at: { type: Date, default: null }
});

export default connection => connection.model("Ranking", schema);
