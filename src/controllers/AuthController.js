class AuthController {
    /**[POST] /api/auth/login
     * Client send username and password
     * public
    */
    login(req, res) {
        // console.log(req.userInfo);
        return res.json({ success: true, message: 'login api', data: req.userInfo });
    }
}

module.exports = new AuthController;