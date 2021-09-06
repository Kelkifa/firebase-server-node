class OrderController {

    async add(req, res) {
        const { data } = req.body;
        console.log(data);
        return res.json({ success: true, message: 'successfully' });
    };
}

module.exports = new OrderController;