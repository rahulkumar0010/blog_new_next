const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    short_desc: { type: String, require: true },
    slug: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Blog", blogSchema);
