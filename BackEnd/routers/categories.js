const { Category } = require('../models/category')
const express = require('express')
const router = express.Router()

router.get(`/`, async (req, res) => { //Getting all data
    const categoryList = await Category.find()
        .then((category) => {

            if (!categoryList) {
                res.status(500).json({
                    success: false
                })
            } else {
                res.send(categoryList)
            }
        })

    router.get('/:id', async (req, res) => { //Getting data by {id}
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).json({
                success: false,
                message: 'Category not found'
            })
        } else {
            return res.status(200).send(category)
        }
    })
})

router.post(`/`, async (req, res) => { //Posting data
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save()

    if (!category) {
        res.status(404).send('Categories not found!')
    } else {
        res.send(category)
    }
})

router.put('/:id', async (req, res) => { //Updating by {id}
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        {
            new: true
        }
    )

    if (!category) {
        return res.status(400).json({
            success: false,
            message: 'Sorry the id cannot be updated :('
        })
    } else {
        return res.status(200).send(category)
    }
})

router.delete('/:id', (req, res) => { //Deleting data by {id}
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({
                    success: true,
                    message: 'Record has been deleted :)'
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Record not found :('
                })
            }
        }).catch((err) => {
            res.status(400).json({
                success: false,
                error: err
            })
        })
})

module.exports = router