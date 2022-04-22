const express = require('express')
const router = express.Router()
const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
    const user = await User.find().select('-passwordHash')

    if (!user) {
        res.status(400).send('User not found :(')
    }

    res.send(user)
})

router.get('/:id', (req, res) => {
    user = User.findById(req.params.id).select('-passwordHash')
        .then((response) => {
            if (!response) {
                res.status(400).send("Id Not found :(")
            } else {
                res.send(response)
            }
        }).catch((err) => {
            res.send(err)
        })
})


router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })

    users = user.save()
        .then((users) => {
            if (!users) {
                return res.status(400).send('User not found :(')
            } else {
                return res.send(users)
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        return res.status(400).send('Email not found :(')
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign({
            userID: user.id
        },
            'secret',
            {
                expiresIn: '1w'
            }
        )
        return res.status(200).send({ user: user.email, token: token })
    } else {
        return res.status(400).send('Invalid Password')
    }
})

module.exports = router