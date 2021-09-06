const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var mongoose_delete = require('mongoose-delete');

const products = new Schema(
    {
        name: { type: String },
        description: { type: String },
        cost: { type: Number, require },
        position: { type: String },
        img: [String],
        shapes: [{
            name: { type: String },
            img: { type: String },
        }],
        colors: [{
            name: { type: String },
            img: { type: String },
        }],
        likes: { type: Number, min: 0, default: 0 },
        sold: { type: Number, default: 0 },
        type: { type: String, default: 'tiện ích' }, //
    },
    {
        timestamps: true
    }
);
products.plugin(mongoose_delete, { overrideMethods: 'all' });

module.exports = mongoose.model('products', products);

//fake product
// const products = [
//     {
//         name: 'Chau cay',
//         description: 'Chay cay cong nghe in 3d dep la',
//         cost: 300000,
//         position: 'Dong Nai',
//         img: '',
//         shapes: [
//             {
//                 name: 'dai',
//                 img: '',
//             },
//             {
//                 name: 'ngan',
//                 img: ''
//             }
//         ],
//         colors: [
//             {
//                 name: 'do',
//                 img: ''
//             }, {
//                 name: 'vang',
//                 img: ''
//             }, {
//                 name: 'cam',
//                 img: ''
//             }

//         ],
//         likes: 10,
//         sold: 20,
//         type: 'tien ich', //   
//     }, {
//         name: 'Mo hinh',
//         description: 'Mo hinh cong nghe in 3d dep la',
//         cost: 900000,
//         position: 'Dong Nai',
//         img: '',
//         shapes: [
//             {
//                 name: 'to',
//                 img: '',
//             },
//             {
//                 name: 'nho',
//                 img: ''
//             }
//         ],
//         colors: [
//             {
//                 name: 'trang',
//                 img: ''
//             }
//         ],
//         likes: 9,
//         sold: 19,
//         type: 'mo hinh', //   
//     }
// ]