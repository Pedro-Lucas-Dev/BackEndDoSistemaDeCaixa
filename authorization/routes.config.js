const VerifyUserMiddleware = require('./middlewares/verify.user.middleware')
const AuthorizationController = require('./controllers/authorization.controller')
const AuthValidationMiddleware = require('../common/middlewares/auth.validation.middleware')

exports.routesConfig = (app) => {
    app.use('/auth',VerifyUserMiddleware.hasAuthValidFields)
    app.use('/auth',VerifyUserMiddleware.isPasswordAndUserMatch)
    app.post('/auth', AuthorizationController.login); 
    
    app.use('/auth/refresh', AuthValidationMiddleware.validJWTNeeded)
    app.use('/auth/refresh', AuthValidationMiddleware.verifyRefreshBodyField)
    app.use('/auth/refresh', AuthValidationMiddleware.validRefreshMethod)
    app.post('/auth/refresh', AuthorizationController.login); 
}