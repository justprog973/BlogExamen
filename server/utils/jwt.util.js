const jwt = require('jsonwebtoken');

module.exports = {
    generateToken: function (data) {
        return jwt.sign({
            userId: data.id,
            isdamin: data.admin
        }, process.env.SECRET_TOKEN, {
            expiresIn: "1h"
        });
    },
    parseAuthorization: function (authorization) {
        return (authorization !== null) ? authorization.replace('Bearer', '') : null;
    },
    getUserId: function (authorization) {
        let userId = -1;
        const token = module.exports.parseAuthorization(authorization);
        if (token) {
            try {
                const jwtToken = jwt.verify(token.trim(), process.env.SECRET_TOKEN);
                if (jwtToken) {
                    userId = jwtToken.userId;
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        return userId;
    }
}