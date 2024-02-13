const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    org_name: {
        type: String,
        required: true,
    },
    org_email: {
        type: String,
        required: true,
    },
    org_code: {
        type: String,
        required: true,
    },
});

const OrganizationModel = mongoose.model("Organization", OrganizationSchema);

module.exports = OrganizationModel;
