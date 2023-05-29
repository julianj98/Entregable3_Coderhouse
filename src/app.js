const express = require('express');
const app = express();
const ProductManager = require("./ProductManager.js");
const productManager = new ProductManager();
app.use(express.urlencoded({ extended: true }))


app.get("/products", (req, res) => {
    const products = productManager.getProducts();
    const { limit } = req.query
    if (!limit) res.json(products)
    else {
        const productsLimit = products.slice(0, parseInt(limit));
        res.json(productsLimit);
    }
});
app.get("/products/:id", (req, res) => {
    const { id } = req.params
    const products = productManager.getProducts();
    const productById = products.find(productById => productById.id == id);
    if (productById) return res.json(productById);
    else res.json({ error: "Product does not exist" });
})

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})
//✓	Se mandará a llamar desde el navegador a la url //localhost:8080/products sin query, eso debe devolver todos los 10 productos.localhost:8080/products
//✓	Se mandará a llamar desde el navegador a la url //localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
//✓	Se mandará a llamar desde el navegador a la url //localhost:8080/products/2, eso debe devolver sólo el producto con id=2.
//✓	Se mandará a llamar desde el navegador a la url //localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.