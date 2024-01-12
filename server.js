const express = require('express')
const productsRouter = require('./src/routes/products.router.js')
const cartsRouter = require('./src/routes/carts.router.js')
const viewsRouter = require('./src/routes/views.router.js')
const productManagerFileSystem = require('./src/managers/productManagerFileSystem')
const productService = new productManagerFileSystem()

const { Server: ServerIO } = require('socket.io');


//Entrega 5 Websockets + Handlebars
const handlebars = require('express-handlebars')

const app = express()

app.use(express.static(__dirname+'/public'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Entrega 5 Websockets + Handlebars
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')
app.use('/static', express.static(__dirname+'/public'))


//Las rutas de mi server
app.use('/', viewsRouter);
app.use('/api/products',productsRouter )
app.use('/api/carts', cartsRouter )

const httpServer = app.listen(8080, ()=>{
    console.log('Server con Socket en el puerto 8080')
})

const socketServer = new ServerIO(httpServer)


//websockets para Productos:
 socketServer.on('connection', socket => {
     console.log("Nuevo cliente conectado")   

     /** Para establecer conexion */
     socket.on('message', data=>{ 
        console.log(data)
     })

   /** Para agregar productos */
     socket.on("addProduct", async (productData) => {
        try {
    
    
            console.log('addProduct en el Server')
            console.log(productData)
            await productService.addProducts(productData);      
            
          
            
        } catch (error) {
            console.error('Error en addProduct:', error);
        }
    });
 
       /** Para Borrar productos */
       socket.on("deleteProduct", async (productData) => {
        try {

            
            await productService.deleteProductById(productData.id);
            console.log(productData)
    
            
        } catch (error) {
            console.error('Error en deleteProduct:', error);
        }
    })
 
    /** Para Actualizar productos */
       socket.on("updateProduct", async (productData) => {
        try {

            console.log('updateProduct en el Server')
            //console.log(productData.id);
            console.log(productData);
           
            await productService.updateProductById(productData.id,productData);
            
    
            
        } catch (error) {
            console.error('Error en updateProduct:', error);
        }
    })

   
 })






