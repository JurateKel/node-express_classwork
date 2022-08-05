const emailValidator = require("email-validator");

module.exports = (req, res, next) => {
    const {email, password, interests} = req.body

    let allKeysValid = true
    Object.keys(req.body).map(key => req.body[key] ? null : allKeysValid = false)
    if(!allKeysValid) return res.send({error: 'keys'})

    const validEmail = emailValidator.validate(email)
    if(!validEmail) return res.send({error: 'email'})

    if(password.length < 4 || password.length > 30) return res.send({error: 'password'})

    // if(interests.length === 0) return res.send({error: 'interests'})    
    
    next()
}
