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
  name: {
    type: String,
    required: true
  },
  description: String,
  trees: [
    {
      kind: String,
      tree_id: String,
      name: String
    }
  ],
  images: Array,
  url: {
    type: String,
    required: true
  },
  details: Object,
  attributes: Object,
  references: Array,
  price_from: Number,
  price_to: {
    type: Number,
    required: true
  },
  price_discount_value: Number,
  price_discount_off: Number,
  is_promo: Boolean,
  stock: Number,
  is_available: Boolean,
  condition: String,
  release_date: { type: Date, default: Date.now() },
  source: String,
  must_update: Array,

  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date, default: null }
});

export default connection => connection.model("Product", schema);
