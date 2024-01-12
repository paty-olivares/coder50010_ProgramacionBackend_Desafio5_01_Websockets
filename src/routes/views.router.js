const express = require('express')
const router = express.Router()
const productManagerFileSystem = require('../managers/productManagerFileSystem')
const productService = new productManagerFileSystem()


router.get('/', (req,res)=> {
    res.render('index.handlebars', {})
})

router.get('/realtimeproducts',  async (req, res) => {
    try{
        const result = await productService.getProducts(); 
              

       // console.log(result)
        const { code, name, category, price, stock  } = result
        res.render('realTimeProducts.handlebars', {result})
    }catch(error){
        //res.sendServerError(error.message)
        console.log(error.message)
    }
})



module.exports = router