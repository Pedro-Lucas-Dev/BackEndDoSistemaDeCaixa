exports.hasValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.name) {
            errors.push('Missing name field');
        }
        if (errors.length) {
            return res.status(400).send({errors});
        } else {
            return next()
        }
    } else {
        return res.status(400).send({errors: 'Missing name field' })
    }
}