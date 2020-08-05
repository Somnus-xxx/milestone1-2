module.exports = async function (req, res, proceed) {
    if (req.session.Username == 'Client'||'client2') {
        return proceed();
    }
    return res.forbidden();
}