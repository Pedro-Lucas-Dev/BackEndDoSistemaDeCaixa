const CategoryController = require('./controllers/category.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const VerifyUserMiddleware = require('./middlewares/verify.category.middleware')

exports.routesConfig = (app) => {
    app.use('/category', ValidationMiddleware.validJWTNeeded)
    
    app.get('/category', CategoryController.list)
    
    app.get('/category/:categoryId', CategoryController.getById)
    
    app.patch('/category/:categoryId', CategoryController.patchById)
    
    app.delete('/category/:categoryId', CategoryController.removeById)
    
    app.use('/category',VerifyUserMiddleware.hasValidFields)
    app.post('/category', CategoryController.insert)
    
       
}