
module.exports = (req, res, next) => {
    const {userName, password} = req.body

    if(userName.length < 5) return res.send({error: true, message: 'User name must contain 5 symbols or more'})

    if(password.length < 4 || password.length > 30) return res.send({error: true, message: 'Password is too short or too long'})
    
    next()
}
