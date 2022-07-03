const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    website: String,
    email: String,
    businessName: String,
    designation: String,
    twitter: String,
    linkdin: String,
    facebook: String,
    instagram: String,
    logo: String,
    address: String,
    cardFrontImg: String,
    cardBackImg: String,
    templateId: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", cardSchema);
