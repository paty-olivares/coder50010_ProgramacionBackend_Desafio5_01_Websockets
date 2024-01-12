const express = require('express')
const productManagerFileSystem = require('../managers/productManagerFileSystem')

const router = express.Router()
const productService = new productManagerFileSystem()

// GET /productos  TODOS Pero Evaluando el Query - Limit
router.get('/', async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.params);

    const limit = parseInt(req.query.limit);
    
    console.log(limit)
   
    const products = await productService.getProducts();  
    if (!limit) { 
        res.status(200).json(products)
    }else {
        res.send(products.slice(0,limit));
    }
})

// GET /productos/:id  PRODUCTOS POR ID
router.get('/:id', async (req, res) => {
    console.log(req.params);
    const {id} = req.params;
    console.log(id);
    
    
    const products = await  productService.getProductsById(id);  
    res.status(200).json(products)
    
    
})


router.post('/', async (req, res) => {

try {
    const product = req.body;

    //Estaba empezando a meter validaciones pero me di cuenta que ya están contempladas en el productService :)
    const result = await  productService.addProducts(product);  
    console.log(result)
    res.send({
        status: 'success',
        payload: result
    })
}
catch(error) {
    res.status(500).send(`Error Agregando Producto ${error.message}`)
}
})

router.put('/:pid', async (req, res) => { 
    try {
        const { pid } = req.params

     console.log(pid)
     console.log(req.body)

        const result = await  productService.updateProductById(pid, req.body );  
        console.log(result)
        res.send({
            status: 'success',
            payload: result
        })
    }
    catch(error) {
        res.status(500).send(`Error Actualizando el Producto ${error.message}`)
    }
    })

    router.delete('/:pid', async (req, res) => { 
        try {
    
         const { pid } = req.params
         console.log(pid)
         
         const result = await  productService.deleteProductById(pid);  
         console.log(result)

         res.send({
                status: 'success',
                payload: result
            })
        }
        catch(error) {
            res.status(500).send(`Error Borrando el Producto ${error.message}`)
        }
        })
        
module.exports = router