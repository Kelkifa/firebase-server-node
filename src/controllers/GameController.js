const gameModel = require('../models/games');

class GameControlelr {
    /**[GET] /api/games
     * response all game imgs
     * public
     */
    async index(req, res) {
        try {
            const response = await gameModel.find({}).sort({ createdAt: 'desc' });
            return res.json({ success: true, message: 'successfully', response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /** [GET] /api/games/adminGet
     *  Admin get trash and list game
     *  private
     */
    async adminGet(req, res, next) {
        try {
            const [listResponse, trashResponse] = await Promise.all([
                gameModel.find({}).sort({ createdAt: 'desc' }),
                gameModel.findDeleted().sort({ updatedAt: 'desc' })
            ]);
            return res.json({ success: true, message: 'successfully', listResponse, trashResponse });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /**[POST] /api/games/ 
     * Store new game img
     * private
    */
    async addMany(req, res) {
        const { data } = req.body;
        if (!data)
            return res.json({ success: false, message: 'bad request' });
        if (!data.data.length)
            return res.json({ success: false, message: 'bad request' });

        try {
            const newData = data.data.map(value => { return { data: value, type: data.type } });
            const newGame = await gameModel.create(newData);
            console.log(newGame);

            return res.json({ success: true, message: 'successfully', response: newGame });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' })
        }
    }
    /** [DELETE] /api/games/delete
     *  Force Delete games
     *  private 
     */
    async delete(req, res) {
        const data = req.body ? req.body : [];
        if (!data.length)
            return res.status(400).json({ success: false, message: 'bad request' });

        try {
            await gameModel.deleteMany({ _id: { $in: data } });
            return res.json({ success: true, message: 'successfully', response: data });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }

    /** [POST] /api/games/getTest
     *  change game schema
     *  private
     */
    async getTest(req, res) {
        const { data } = req.body;
        try {
            const response = await gameModel.findOne({ _id: "612cf26d749dbd125c00c694" });
            console.log(response)
            return res.json({ success: true, message: 'successfully' });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
}

module.exports = new GameControlelr;