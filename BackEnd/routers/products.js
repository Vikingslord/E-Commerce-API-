const express = require('express')
const router = express.Router()
const { Product } = require('../models/product')
const { Category } = require('../models/category')

router.post(`/`, async (req, res) => {

    const category = await Category.findById(req.body.category)

    if (!category) {
        return res.status(404).json({
            message: 'Category not found :('
        })
    }

    let product = new Product({
        name: req.body.name,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    product = await product.save()

    if (!product) {
        return res.status(400).json({
            success: false,
            message: 'Unable to post :('
        })
    } else {
        return res.send(product)
    }
})

router.get(`/`, async (req, res) => {

    const productList = await Product.find()

    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList)
})

router.get('/:id', async (req, res) => {

    const product = await Product.findById(req.params.id).populate('category')

    if (!product) {
        return res.status(400).json({
            message: "Product not found :("
        })
    } else {
        return res.send(product)
    }
})

router.put('/:id', async (req, res) => { //Updating by {id}

    const category = await Category.findById(req.body.category)

    if (!category) {
        return res.status(404).json({
            message: 'Category not found :('
        })
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        {
            new: true
        }
    )

    if (!product) {
        return res.status(500).json({
            success: false,
            message: 'Sorry the id cannot be updated :('
        })
    }
    return res.send(product)

})

router.delete('/:id', (req, res) => { //Deleting data by {id}
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
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