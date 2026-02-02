module.exports = (req,res, next) => {
    if (!req.query.id) {
        return res.status(400).json({message: 'ID nção foi informado'})
    }
    next();
}