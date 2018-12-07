import mongoose from "mongoose";
import uuid from "uuid";

const schema = new mongoose.Schema({
  _id: { type: String, default: uuid.v4 },
  product_id: { type: String, index: true },
  sku: { type: String, index: true },
  name: String,
  description: String,
  trees: [
    {
      kind: String,
      tree_id: String,
      name: String
    }
  ],
  images: [
    {
      full: String,
      thumb: String
    }
  ],
  url: String,
  references: Array,
  price_from: Number,
  price_to: Number,
  price_discount_value: Number,
  price_discount_off: Number,
  stock: Number,
  is_available: Boolean,
  release_date: { type: Date, default: Date.now() },
  source: String,
  must_update: Array,

  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  deleted_at: { type: Date, default: null }
});

export default connection => connection.model("Product", schema);
