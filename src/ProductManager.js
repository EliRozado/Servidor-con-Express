// * --- Formato del producto = {title, description, price, thumbnail/link), code, stock}
import fs from 'fs';

class ProductManager{
    constructor(path){
        this.path = path;
    }

    addProduct({title, description, price, thumbnail, code, stock}){
        const productList = this.getData();

        // Verificar que el codigo no se haya usado
        if(productList.length != 0){
            let verifyCode = productList.find(product => product.code == code);
            if(verifyCode){
                return 'The code already exists in the product list.';
            }
        }

        let product = { title, description, price, thumbnail, code, stock }
        // Asignarle un ID
        if(productList.length == 0){
            product.id = 1
        }else{
            let lastItemID = productList[productList.length - 1].id
            product.id = lastItemID + 1
        }

        productList.push(product);
        fs.writeFileSync(this.path,JSON.stringify(productList, null, 2))
        return product;
    }

    getProducts(){
        return this.getData();
    }

    getProductByID(id_prod){
        let productList = this.getData();

        let searchProduct = productList.find(product => product.id == id_prod);
        if(searchProduct){
            return searchProduct;
        }else{
            return {err: 'A product with that ID does not exist in the list'}
        }
    }

    updateProduct(id_prod, {title, description, price, thumbnail, code, stock}){
        // Actualiza un producto
        let productList = this.getData();

        let index = productList.findIndex(product => product.id == id_prod);

        if(index >= 0){
            let product = productList[index];

            if(product.title != title && title ){
                productList[index].title = title;
            }
            if(product.description != description && description){
                productList[index].description = description;
            }
            if(product.price != price && price){
                productList[index].price = price;
            }

            if(product.thumbnail != thumbnail && thumbnail){
                productList[index].thumbnail = thumbnail;
            }

            if(product.code != code && code){
                productList[index].code = code;
            }

            if(product.stock != stock && stock){
                productList[index].stock = stock;
            }  

            fs.writeFileSync(this.path,JSON.stringify(productList, null, 2));
            return 'The product was updated.'
        }else{
            return 'The product is not in the list.'
        }
    }

    deleteProduct(id_prod){
        let productList = this.getData();

        let indexProduct = productList.findIndex(product => product.id == id_prod)

        if(indexProduct >= 0){
            productList.splice(indexProduct,1)
            fs.writeFileSync(this.path,JSON.stringify(productList, null, 2))
            return 'The product was successfully deleted.'
        }else{
            return 'The product is not in the list.'
        }
    }
    
    getData(){
        // Extrae data del archivo. Si no existe aun, devuelve un array vacio.
        let data = []
        try{
            const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            productos.forEach(element => {
                data.push(element)
            });

        }catch{
            console.log('The file was empty or did not exist.')
        }
        return data;
    }

}

export default ProductManager;

// * ---------- Testing ---------- *
/*const testProd = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price:200,
    thumbnail:"Sin imagen",
    code: "abc123",
    stock:25
}

const instancia = new ProductManager('./productList.json');

console.log(instancia.getProducts())
instancia.addProduct(testProd)
console.log(instancia.getProducts())
console.log(instancia.addProduct(testProd))
console.log(instancia.getProductByID(1))
console.log(instancia.updateProduct(1, {price: 300}))
console.log(instancia.deleteProduct(2))*/