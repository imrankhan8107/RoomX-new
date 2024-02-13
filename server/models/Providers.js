const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
  provider_name: {
    type: String,
    required: true,
  },
  provider_email: {
    type: String,
    required: true,
  },
  provider_code: {
    type: String,
    required: true,
  },
  provider_address: {
    type: String,
    required: true,
  },
  provider_phone: {
    type: String,
    // required: true,
  },
  provider_description: {
    type: String,
    // required: true,
  },
  provider_rating: {
    type: String,
    // required: true,
  },
  provider_reviews: {
    type: [String],
    // required: true,
  },
  provider_rooms: {
    type: [String],
    // required: true,
  },
});

const ProviderModel = mongoose.model("Provider", ProviderSchema);

module.exports = ProviderModel;
