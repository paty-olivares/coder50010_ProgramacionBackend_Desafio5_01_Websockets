const { promises: fs } = require('fs')


class CartManagerFileSystem{
    constructor(){
        this.path='./src/jsonDb/Carts.json'
    }

   async readFile() {
    try{
        const dataCarts = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(dataCarts)
    }
    catch(error) {
        return []
    }

   }

   async createCart(){
    try{
        const carts = await this.readFile()
        let myId = Math.random()* 15
        let newCart = {
            id: Math.round(myId),
            products : []
        }
        carts.push(newCart)
       await fs.writeFile(this.path, JSON.stringify(carts,null,2), 'utf-8')
       return carts
    }
    catch(error) {
        return `Error createCart  ${error}`
    }

   }

   async getCartById(cid){
    try{
        const carts = await this.readFile()
        const cart = carts.find(cart => cart.id === cid)
        if (!cart) {
            return 'No pude encontrar el Cart'
        }
      return cart
       
    }
    catch(error) {
        return `Error getCartById ${error}`
    }

   }

   async addProductToCart(cid, pid){
    try{
        //primero busco el cart
        const carts = await this.readFile()
        const cartIdx = carts.findIndex(cart => cart.id === cid)
        if (cartIdx === -1) {
            return 'No pude encontrar el Cart -1'
        }

        const productIdx = carts[cartIdx].products.findIndex(product => product.product === pid)
        if (productIdx === -1) {
            carts[cartIdx].products.push({
                 product: pid,
                 quantity: 1
            })
        }else{
            carts[cartIdx].products[productIdx].quantity += 1
        }

       await fs.writeFile(this.path, JSON.stringify(carts,null,2), 'utf-8')
       return  carts[cartIdx]
    }
    catch(error) {
        return `Error createCart  ${error}`
    }
   }


}

module.exports = CartManagerFileSystem