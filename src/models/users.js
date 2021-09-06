const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const users = new Schema(
    {
        userId: { type: String, required: true },
        name: { type: String },
        email: { type: String },
        photoUrl: { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', users);