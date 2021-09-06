const verifyIdToken = require('../cores/authVerify');

async function authMidleware(req, res, next) {
    const authHeader = req.header('Authorization');

    const token = authHeader && authHeader.split(' ')[1];


    // Khong co Token
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Didn't login" });

    // Co token
    try {
        const decodedToken = await verifyIdToken(token);
        req.userInfo = decodedToken;
        next();

    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, message: 'Invalid token' });
    }
    // next();
}

module.exports = authMidleware;