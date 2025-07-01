const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(
        { id: user.id, name: user.name },
        process.env.SECRET_KEY || 'superpassword_!23',
        { expiresIn: "1h"}
    );
}

module.exports = generateToken;
