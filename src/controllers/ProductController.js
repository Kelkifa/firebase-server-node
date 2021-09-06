const productModel = require('../models/products');
const textareaDataToArray = require('../cores/textareaDataToArray');


class ProductController {
    /** [GET] /api/products
     *  get product list
     *  public
     */
    async index(req, res) {
        const { id } = req.body;
        console.log(req.body);
        try {
            if (!id) {
                const response = await productModel.find();
                return res.json({ success: true, message: 'successfully', response });
            }
            const response = await productModel.findOne({ _id: id });
            return res.json({ success: true, message: 'successfully', response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Internal Server' });
        }
    }
    /** [GET] /api/products/adminGet
     * Get produdcts and deleted products
     * Private
     */
    async adminGet(req, res) {
        try {
            const [listResponse, trashResponse] = await Promise.all([
                productModel.find(),
                productModel.findDeleted()
            ])
            return res.json({ success: true, message: 'successfully', listResponse, trashResponse });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Internal Server' });
        }
    }
    /** [PUT] /api/products/update
     *  Update a products
     *  private
     */
    async update(req, res) {
        const { data, id } = req.body;

        if (!data) return res.status(400).json({ success: false, message: 'bad request' });

        const shapeNames = textareaDataToArray(data.shapeNames);
        const shapeLinks = textareaDataToArray(data.shapeLinks);

        const colorNames = textareaDataToArray(data.colorNames);
        const colorLinks = textareaDataToArray(data.colorLinks);

        if (shapeNames.length !== shapeLinks.length || colorNames.length !== colorLinks.length)
            return res.status(400).json({ success: false, message: 'bad request' });

        try {

            const shapes = shapeNames.map((shapeName, index) => ({ name: shapeName, img: shapeLinks[index] }));
            const colors = colorNames.map((colorName, index) => ({ name: colorName, img: colorLinks[index] }));

            const newData = {
                name: data.name,
                description: data.description,
                position: data.position,
                type: data.type,
                cost: parseInt(data.cost.toString().replace('.', '')),
                img: textareaDataToArray(data.img),
                shapes,
                colors
            }

            const response = await productModel.findOneAndUpdate({ _id: id }, newData, { new: true });
            console.log('[updated response]', response);
            return res.json({ success: true, message: 'successfully', response });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }

    /**[PATCH] /api/products/delete
     * Sort delete one or more products
     * private
     */
    async delete(req, res) {
        const { data } = req.body;

        if (!data.length)
            return res.status(400).json({ success: false, message: 'bad request' });
        try {
            await productModel.delete({ _id: { $in: data } });
            return res.json({ success: true, message: 'successfully', response: data });
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /**[DELETE] /api/products/delete 
     * delete one or more products (can't restore)
     * private
    */
    async forceDelete(req, res) {
        const data = req.body;
        if (!data) return res.status(400).json({ success: false, message: 'bad request' });
        try {
            await productModel.deleteMany({ _id: { $in: data } });
            return res.json({ success: true, message: 'successfully', response: data });
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /**[PATCH] /api/product/restore 
     * Restore products
     * private
    */
    async restore(req, res) {
        const { data } = req.body;
        if (!data.length) return res.status(400).json({ success: false, message: 'bad request' });

        try {
            await productModel.restore({ _id: { $in: data } });
            const response = await productModel.find({ _id: { $in: data } });

            return res.json({ success: true, message: 'successfully', response });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }

    }
    /**[POST] /api/products/add
     * Add new product
     * private
     */
    async add(req, res) {
        const { data } = req.body;



        if (!data) return res.status(400).json({ success: false, message: 'bad request' });

        const shapeNames = textareaDataToArray(data.shapeNames);
        const shapeLinks = textareaDataToArray(data.shapeLinks);

        const colorNames = textareaDataToArray(data.colorNames);
        const colorLinks = textareaDataToArray(data.colorLinks);

        if (shapeNames.length !== shapeLinks.length || colorNames.length !== colorLinks.length)
            return res.status(400).json({ success: false, message: 'bad request' });

        try {

            const shapes = shapeNames.map((shapeName, index) => ({ name: shapeName, img: shapeLinks[index] }));
            const colors = colorNames.map((colorName, index) => ({ name: colorName, img: colorLinks[index] }));

            const newData = {
                name: data.name,
                description: data.description,
                position: data.position,
                type: data.type,
                cost: parseInt(data.cost.toString().replace('.', '')),
                img: textareaDataToArray(data.img),
                shapes,
                colors
            }
            const newProduct = new productModel(newData);
            const storedProduct = await newProduct.save();

            return res.json({ success: true, message: 'successfully', response: storedProduct });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /**[GET] /api/products/getDelete
     * get deleted products
     * private
     */
    async getDelete(req, res) {
        try {
            const response = await productModel.findDeleted({});
            console.log(response);
            return res.json({ success: true, message: 'successfully', data: response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
}

module.exports = new ProductController;