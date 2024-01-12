//socket cliente
const socketCliente = io()
socketCliente.emit('message', 'Comunicacion Establecida')

//------------------- AGREGANDO PRODUCTOS CON SOCKET
function addProduct() {
   //obteniendo los valores del formulario 
    let form = document.getElementById("formAddProduct");
    
     let name = form.elements.name.value;
     let category = form.elements.category.value;
     let price = form.elements.price.value;
     let stock = form.elements.stock.value;
     let code = form.elements.code.value;
     let thumbnail = form.elements.thumbnail.value;    
     
     
     socketCliente.emit("addProduct", { name, category, price, stock, code, thumbnail});
     alert('Producto Agregado Correctamente');
     location.reload(); //Para que refresque la pagina y muestre el nuevo producto agregado
   
}

//------------------- ELIMINANDO PRODUCTOS CON SOCKET
    //No uso el form anterior, no lo pude manda a llamar para darle mejor estilo
    const deleteButton =  document.getElementById('delete-btn');
    deleteButton.addEventListener('click', async () => {
    
    //obtengo el id
    let productId = document.getElementById('idDelete').value;
     try {
        // Crear una solicitud DELETE
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
          
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        //Usando el response del DELETE como si estuviera en postman verifico que la transaccion es válida 
        //y entonces mando a llamar el emit
        if (response.status == 200) {
            socketCliente.emit("deleteProduct", {productId});
            alert('Producto eliminado correctamente!');
            location.reload(); //Para que refresque la pagina y muestre la nueva lista sin el producto eliminado 
          
        } else {
          alert('Error al eliminar el producto.');
        }
    
      } catch (error) {
        console.error('Error:', error);
      }
 })

 //------------------- ACTUALIZANDO LOS PRODUCTOS CON SOCKET
 const updateButton =  document.getElementById('update-btn');
 updateButton.addEventListener('click', async () => {
 
  // Obtener los demás valores del formulario
 let id = Number(document.getElementById("idUpd").value);

 let name =     document.getElementById("nameUpd").value;
 let category = document.getElementById("categoryUpd").value;
 let price =    document.getElementById("priceUpd").value;
 let stock =    document.getElementById("stockUpd").value;
 
 let productData = {};
 if (id) productData.id = id;
 if (name) productData.name = name;
 if (category) productData.category = category;
 if (price) productData.price = price;
 if (stock) productData.stock = stock;
 


console.log(productData)
  try {
     // Crear una solicitud PUT
    
     const response = await fetch(`/api/products/${id}`, {
       method: 'PUT',
       body: productData
     });
     console.log(response)
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
    
     //Usando el response del PUT como si estuviera en postman verifico que la transaccion es válida 
     //y entonces mando a llamar el emit
     if (response.status == 200) {
         socketCliente.emit("updateProduct", {id, productData});
         alert('Producto Actualizado correctamente!');
         location.reload(); //Para que refresque la pagina y muestre la nueva lista sin el producto eliminado 
       
     } else {
       alert('Error al Actualizar el producto.(upd)');
     }
 
   } catch (error) {
     console.error('Error (upd):', error);
   }
})