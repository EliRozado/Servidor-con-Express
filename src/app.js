import express from "express";
import ProductManager from "./ProductManager.js";

const products = new ProductManager('./src/productList.json');
const app = express();

app.get('/products', (req, res) => {
    let limit = req.query.limit;

    const productList = products.getProducts()

    res.send(productList.slice(0, limit))

})


// cambiar el archivo a lectura con promesas?
app.get('/products/:pid', (req, res) => {
    const pID = req.params.pid;

    res.send(products.getProductByID(pID))
})

app.listen(8080, () => console.log('Server on!'))