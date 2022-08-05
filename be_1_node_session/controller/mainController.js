const res = require('express/lib/response')
const registrationSchema = require('../models/registrationSchema')
const ReviewSchema = require('../models/ReviewSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')


const users = []


module.exports = {
    registerUser: async (req, res) => {
        const {userName, password} = req.body
        async function encryptPassword() {
            const encryptPassword = await bcrypt.hash(password, 10)
            return encryptPassword
        }
        const user = new registrationSchema
        user.userName = userName
        user.password = await encryptPassword()
        user.photo = 'https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg'

        try {
            if (await registrationSchema.findOne({userName: user.userName})) return res.send({user: null, error: true, message: 'Such user name already exist'})
            else await user.save()
        } catch (error) {
            console.log(error)
            return res.send({user: null, error: true, message: error})
        }
        res.send({error: false, message: 'user created'})
    },
    loginUser: async (req, res) => {
        const {userName, password} = req.body
        let user 
        try {
            user = await registrationSchema.findOne({userName: userName})
            if(user === null) return res.send({post: null, error: true, message: 'Such user was not found'})
        } catch (error) {
            console.log(error)
            return res.send({post: null, error: true, message: error})
        }
        const encrypted = user.password
        const isEqual = await bcrypt.compare(password, encrypted)
        if (isEqual === false) res.send({error: true, message: 'password is incorrect'})
        if (isEqual === true) {
            req.session.user = {id: user._id, userName: user.userName}
            res.send({error: false, message: 'logged in successfully'})
        }
    },
    sessionUser: async (req, res) => {
        let sessionUser
        try {
            sessionUser = req.session.user
        } catch (error) {
            return res.send({error: true, message: error, sessionUser: null})
        }
        if (sessionUser) res.send({error: false, sessionUser})
        if (!sessionUser) res.send({error: true, sessionUser: null})
    },
    changeUserName: async (req, res) => {
        const {userName, newUserName} = req.body

        let user
        try {
            user = await registrationSchema.findOneAndUpdate({userName: userName}, {$set: {userName: newUserName}} )
            req.session.user = {id: user._id, userName: user.userName}
            if (!user) return res.send({error: true, message: 'User not found', user: null})
        } catch (error) {
            return res.send({error: true, message: error, sessionUser: null})
        }

        res.send({user, error: false, message: 'User name updated successfully' })
    },
    getUser: async (req, res) => {
        console.log(req.session.user.userName)
        let user
        try {
            user = await registrationSchema.findOne({userName: req.session.user.userName})
        } catch (error) {
            return res.send({error: true, message: error, sessionUser: null})
        }

        if (user) res.send({error: false, user})
        if (!req.session.user) res.send({error: true, user: null})
    },
    getAllUsers:  async (req, res) => {
        let users
        try {
            users = await registrationSchema.find()
        } catch (error) {
            return res.send({error: true, message: error})
        }

        if (users) res.send({error: false, users})
        if (!users) res.send({error: true, user: null})
    },
    getSelectedUser: async (req, res) => {
        const {userName} = req.params
        console.log(userName)
        let user
        try {
            user = await registrationSchema.findOne({userName: userName})
            console.log(user)
        } catch (error) {
            return res.send({error: true, message: error, user: null})
        }
        console.log(user)
        if (user) res.send({error: false, user})
        if (!user) res.send({error: true, user: null})
    },
    saveReview: async (req, res) => {
        const {text, rating, sender, receiver} = req.body
        console.log(rating)

        const newReview = new ReviewSchema
        newReview.text = text ? text : 'no data'
        newReview.rating = rating
        newReview.sender = sender
        newReview.receiver = receiver
        console.log(newReview);

        try {
            await newReview.save()
        } catch (error) {
            console.log(error)
            return res.send({error: true, message: error})
        }
        res.send({error: false, message: 'review saved', newReview})
    },
    getReviews: async (req, res) => {
        const {receiver} = req.params
        let reviews
        try {
            reviews = await ReviewSchema.find({receiver: receiver})
            if (!reviews) res.send({error: true, message: 'reviews not found'})
        } catch (error) {
            console.log(error)
            return res.send({error: true, message: error})
        }
        console.log(reviews)
        res.send({error: false, reviews})
    },
    logOut: async (req, res) => {
        req.session.user = null
        const sessionUser = req.session
       
        res.send({sessionUser: sessionUser})
    }


}