module.exports = {
    "port": process.env.PORT,
    "jwt_secret": process.env.JWT_SECRET,
    "jwt_expiration_in_seconds": 36000,
    "environment": process.env.ENVIRONMENT,
    "permissionLevels": {
        "NORMAL_USER": 1,
        "ADMIN": 2
    }
};