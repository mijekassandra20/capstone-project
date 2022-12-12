const userValidator = (req, res, next) => {

    if(req.body){
        if(
            !req.body.userName ||
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.gender ||
            !req.body.age ||
            !req.body.email ||
            !req.body.password 
        ) {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json({ success: false, msg: 'Missing Required fields! '})
        } else {
            next();
        }

    }

}

const adminValidator = (req, res, next) => {
    // check if admin value is true from req.user

    if (req.user.admin) {
        next()
    } else {
        res
        .status(403)
        .setHeader('Content-Type', 'application/json')
        .json({ success: false, msg: 'Unauthorized to access this resource!!'})
    }
}


module.exports = {
    userValidator,
    adminValidator
}