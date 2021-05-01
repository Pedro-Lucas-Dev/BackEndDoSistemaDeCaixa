const SalesController = require('./controllers/sales.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = (app) => {
    app.use('/sales', ValidationMiddleware.validJWTNeeded)
    
    app.get('/sales', SalesController.list)
    
    app.get('/sales/:saleId', SalesController.getById)
    
    app.patch('/sales/:saleId', SalesController.patchById)
    
    app.delete('/sales/:saleId', SalesController.removeById)
    
    app.post('/sales', SalesController.insert)
    
       
}