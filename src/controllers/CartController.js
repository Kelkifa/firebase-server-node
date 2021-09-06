const cartModel = require('../models/carts');
const productModel = require('../models/products');

class CartController {
    /**[GET] /api/carts
     * Show list cart of user
     * loged
     */
    async index(req, res) {
        const userInfo = req.userInfo;
        if (!userInfo || !userInfo.uid)
            return res.status(500).json({ success: false, message: 'need to login' });

        try {
            const response = await cartModel.find({ userId: userInfo.uid }).populate('productId').sort({ updatedAt: 'desc' });

            return res.json({
                success: true,
                message: 'successfully',
                data: response,
            });

        } catch (err) {
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }

    /**[GET] /api/carts/add
     * Tao mot cart moi
     * loged
     */
    async add(req, res) {
        const { data } = req.body;
        const userInfo = req.userInfo;
        if (!data.shape || !data.color) return res.status(400).json({ success: false, message: 'bad request' });
        data.userId = userInfo.uid;

        try {
            // GET PRODUCT BY PRODUCT ID
            const product = await productModel.findOne({ _id: data.productId });

            // CHECK SHAPE AND COLOR IS INCLUDED IN PRODUCT
            const shapeFlag = product.shapes.findIndex(shape => data.shape === shape.name);
            const flagColor = product.colors.findIndex(color => data.color === color.name);

            if (shapeFlag === -1 || flagColor === -1)
                return res.status(400).json({ success: false, message: 'bad request' });

            // OK
            const savedCart = await cartModel.create(data);
            const populatedSavedCart = await savedCart.populate('productId').execPopulate();

            return res.json({ success: true, message: 'successfully', response: populatedSavedCart });

        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: 'internal server' })
        }
    }

    /** [DELETE] /api/carts/delete
     *  Delete cart
     *  Public
     */
    async delete(req, res) {
        const data = req.body ? req.body : [];
        console.log(data);
        // console.log(req.body);
        // if (!data) return res.status(400).json({ success: false, message: 'bad request' });

        try {
            await cartModel.deleteMany({ _id: { $in: data } });
            return res.json({ success: true, message: 'successfully', response: data });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
}

module.exports = new CartController;