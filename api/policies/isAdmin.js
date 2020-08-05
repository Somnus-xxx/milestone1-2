module.exports = async function (req, res, proceed) {
    if (req.session.Username == 'admin') {
        return proceed();
    }
    return res.forbidden();
}