const jwt = require("jsonwebtoken");

/**** Verify token ******/
module.exports.verifyToken = async(req, res, next) => {
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"];
        let decoded = {};
        try {
            decoded = await jwt.verify(token, 'MY_JSON_TOEKN_KEY_2022');
        } catch (err) {
            console.log(err)
            return res.status(401).json({status: 401, success: false, message: 'Invalid or Expired Token', data: {}});
        }
        req.user = decoded
        next();
    } else {
        return res.status(401).json({status: 401, success: false, message: 'Authorization is required', data: {}});
    }
};