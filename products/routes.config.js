const ProductsController = require('./controllers/products.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const VerifyMiddleware = require('./middlewares/verify.products.middleware')

exports.routesConfig = (app) => {
    app.use('/products', ValidationMiddleware.validJWTNeeded)
    
    app.get('/products', ProductsController.list)
    
    app.get('/products/:productId', ProductsController.getById)
    
    app.patch('/products/:productId', ProductsController.patchById)
    
    app.delete('/products/:productId', ProductsController.removeById)
    
    app.use('/products',VerifyMiddleware.hasValidFields)
    app.post('/products', ProductsController.insert)
    
       
}