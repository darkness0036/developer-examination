const express = require('express')
const router = express.Router()
const ProductAll = require('../models/ProductModel')

router.get('/get_item', async (req, res) => {
  let products = await ProductAll.find({})
  res.json({ status: '200', message: 'OK', data: products })
})

router.get('/get_item/:id', async (req, res) => {
  const productId = req.params.id
  try {
    let product = await ProductAll.findById(productId)
    if (!product) {
      return res
        .status(404)
        .json({ status: '404', message: 'Product not found' })
    }
    res.json({ status: '200', message: 'OK', data: product })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: '500', message: 'Server error' })
  }
})

router.post('/insert_item', async (req, res) => {
  const {name,price,quantity,description}= req.body
  try {
    console.log(req.body)
    const newProduct = await ProductAll.create({
      name: name,
      price: price,
      quantity: quantity,
      description: description
    })
    res.json({ status: '200', message: 'OK', data: newProduct })
    console.log(newProduct)
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: '500', message: 'Server error' })
  }
})

router.post('/update_item', async (req, res) => {
  const {_id, name, price, description, quantity } = req.body
  try {
    const updatedProduct = await ProductAll.findByIdAndUpdate(
      {_id:_id},
      { name:name, price:price, description:description, quantity:quantity },     
    )
    console.log(updatedProduct)
    console.log(req.body)
    if (!updatedProduct) {
      return res.status(404).json({
        status: '404',
        message: 'Product not found'
      })
    }
    res.json({ status: '200', message: 'OK', data: updatedProduct })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: '500', message: 'Server error' })
  }
})

module.exports = router
