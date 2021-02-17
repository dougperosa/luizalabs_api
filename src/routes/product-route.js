'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/product-controller')

router.get('/', controller.get)
router.get('/id/:id', controller.getById)
router.get('/allfilters/:title/:category', controller.getByAllFilters)
router.get('/title/:title', controller.getByTitle)
router.get('/category/:category', controller.getByCategory)
router.post('/', controller.post)
router.put('/', controller.put)
router.delete('/:id', controller.delete)

module.exports = router