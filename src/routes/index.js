const productRouter = require('./product');
const cartRouter = require('./cart');
const authRouter = require('./auth');
const gameRouter = require('./game');
const orderRouter = require('./order');

const authMidleware = require('../midlewares/authMidleware');

function router(app) {
    app.use('/api/auth', authMidleware, authRouter);
    app.use('/api/carts', authMidleware, cartRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/products', productRouter);
    app.use('/api/games', gameRouter);
}

module.exports = router;