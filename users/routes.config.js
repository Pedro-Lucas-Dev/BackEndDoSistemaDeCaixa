const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const NORMAL_USER = config.permissionLevels.NORMAL_USER;

exports.routesConfig = (app) => {
    app.post('/users', UsersController.insert)
    
    app.use('/users', ValidationMiddleware.validJWTNeeded)
    app.use('/users', PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER))
    app.use('/users/:userId', ValidationMiddleware.validJWTNeeded)
    app.use('/users/:userId', PermissionMiddleware.minimumPermissionLevelRequired(NORMAL_USER))
    app.use('/users/:userId', PermissionMiddleware.onlySameUserOrAdminCanDoThisAction)
    
    app.get('/users', UsersController.list)
   
    app.get('/users/:userId', UsersController.getById)

    app.patch('/users/:userId', UsersController.patchById)

    app.delete('/users/:userId', UsersController.removeById)
    
    app.use('/me', ValidationMiddleware.validJWTNeeded)
    app.get('/me', UsersController.me)
}