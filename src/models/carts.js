const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const carts = new Schema(
    {
        userId: { type: String },   //id cua nguoi dung
        productId: { type: Schema.Types.ObjectId, ref: 'products' },
        soLuong: { type: Number, default: 0 },
        color: { type: String },
        shape: { type: String },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    }
);
// carts.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 24 * 4 }); //Het han trong 4 ngay

module.exports = mongoose.model('carts', carts);