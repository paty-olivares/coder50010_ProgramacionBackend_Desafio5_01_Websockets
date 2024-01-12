const express = require('express')
const CartManagerFileSystem = require('../managers/cartsManagerFileSystem')


const router = express.Router()
const cartService = new CartManagerFileSystem()


router
    .get('/:cid', async (req, res) => {
        console.log(req.query);
        console.log(req.body);
        console.log(req.params);
        
        const {cid} = req.params
        try{
            const cart = await cartService.getCartById(parseInt(cid))
            res.send({
                status: 'success',
                payload: cart
            })
        }
        catch(error){
            console.log(error)
            res.status(500).send(`Error Obteniendo Cart ${error.message}`)
        }


 
    })

    .post('/', async (req, res) => {
        try {
            
            const result = await cartService.createCart()
            console.log(result)
            res.send({
                status: 'success',
                payload: result
            })
        }
        catch(error) {
            res.status(500).send(`Error Creando Cart ${error.message}`)
        }
 
    })

    .post('/:cid/products/:pid', async (req, res) => {
        const {cid,pid} = req.params
       
        try {
            
            const result = await cartService.addProductToCart(Number(cid), Number(pid))
            console.log(result)
            res.send({
                status: 'success',
                payload: result
            })
        }
        catch(error) {
            res.status(500).send(`Error Agregando Producto al Cart ${error.message}`)
        }
        
       
 
    })

module.exports = router

