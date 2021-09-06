const serviceAccount = require("./serviceAccounKey.json");
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function verifyIdToken(token) {
    if (!token) return false;

    const decodedToken = admin.auth().verifyIdToken(token);
    return decodedToken;
}
module.exports = verifyIdToken;
