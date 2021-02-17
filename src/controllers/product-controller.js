'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = (req, res, next) => {
    Product.find({
        active: true //filtro
    }, 'title description price category').sort({title: 1})
    .then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    })
}

exports.getByCategory = (req, res, next) => {
    Product.find({
        category: req.params.category,
        active: true //filtro
    }, 'title description price category').sort({title: 1})
    .then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    })
}

exports.getByTitle = (req, res, next) => {
    Product.find({
        title: new RegExp(req.params.title),
        active: true //filtro
    }, 'title description price category').sort({title: 1})
    .then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    })
}

exports.getByAllFilters = (req, res, next) => {
    Product.find({
        title: new RegExp(req.params.title),
        category: req.params.category,
        active: true //filtro
    }, 'title description price category').sort({title: 1})
    .then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    })
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send(e)
    })
}

exports.post = (req, res, next) => {
    var product = new Product(req.body)
    product.save().then(x => {
        res.status(201).send({
            message: 'Produto cadastrado com sucesso'
        })
    }).catch(e => {
        res.status(400).send(e)
    })
}

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.body.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        }
    }).then(x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso'
        })
    }).catch(e => {
        res.status(400).send(e)
    })
}

exports.delete = (req, res, next) => {
    console.log(req.params.id);
    Product.findOneAndRemove({_id: req.params.id})
    .then(x => {
        res.status(200).send({
            message: 'Produto removido com sucesso'
        })
    }).catch(e => {
        res.status(400).send(e)
    })
}