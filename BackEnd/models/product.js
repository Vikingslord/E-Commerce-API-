const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: '' //empty string to store values later
    },

    images: [{ //list (array) of images
        type: String
    }],

    brand: {
        type: String,
        default: '' //empty string to store values later
    },

    price: {
        type: Number,
        default: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },

    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

    rating: {
        type: Number,
        default: 0
    },

    numReviews: {
        type: Number,
        default: 0
    },

    isFeatured: {
        type: Boolean,
        default: false
    },
    
    dateCreated: {
        type: Date,
        default: Date.now
    }

})

exports.Product = mongoose.model('Product', productSchema)