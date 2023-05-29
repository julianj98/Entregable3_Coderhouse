const fs = require('fs');

class ProductManager {
    constructor() {
        this.products = []
        this.path = 'products.json'
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        const CodeExist = this.products.find((elemento) => {
            return elemento.code == code
        })
        if (CodeExist) console.log('el codigo ya existe');
        else {
            this.products.push(product)
        }
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch (error) {
            return "error en la escritura del producto " + error;
        }
    }
    getProducts() {
        if (!fs.existsSync(this.path)) {
          try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
          } catch (err) {
            return "error en la creacion del archivo " + error;
          }
        }
      
        try {
          const data = fs.readFileSync(this.path, "utf-8");
          const dataArray = JSON.parse(data);
          
          if (Array.isArray(dataArray)) {
            return dataArray; 
          } else if (typeof dataArray === 'object' && dataArray !== null) {
            return [dataArray]; //como es un objeto, lo convertimos en un array
          } else {
            return []; // Si no es un objeto ni un array valido, devolver uno vacío
          }
        } catch (err) {
          return "error en la lectura del archivo " + error;
        }
      };
    getProductById(id) {
        const dataById = fs.readFileSync(this.path, "utf-8");
        const dataArrayById = JSON.parse(dataById);
        const ProductExist = dataArrayById.find(product => product.id === id);
        if (ProductExist) console.log(ProductExist)
        else console.log("Not found")
    }
    updateProduct(id, field, newValue) {
        const dataById = fs.readFileSync(this.path, "utf-8");
        const dataArray = JSON.parse(dataById);
        const product = dataArray.find(product => product.id === id);
        try {
            if (product) {
                product[field] = newValue;
                fs.writeFileSync(this.path, JSON.stringify(dataArray));
                console.log("Producto actualizado:", product);
            } else {
                console.log('Producto no encontrado');
            }
        } catch (error) {
            return "error en actualizar el producto " + error;
        }
    }
    deleteProduct(id) {
        const data = fs.readFileSync(this.path, "utf-8");
        const dataArray = JSON.parse(data);
        const productIndex = dataArray.findIndex(product => product.id === id);
        try {
            if (productIndex !== -1) {
                dataArray.splice(productIndex, 1);
                fs.writeFileSync(this.path, JSON.stringify(dataArray));
                console.log("Product deleted.");
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            return "error al borrar el producto " + error;
        }
    }
}

const product = new ProductManager();
module.exports = ProductManager;
//	Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
//product.getProducts();

/* ✓	Se llamará al método “addProduct” con los campos:
-	title: “producto prueba”
-	description:”Este es un producto prueba”
-	price:200,
-	thumbnail:”Sin imagen”
-	code:”abc123”,
-	stock:25
✓	El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
product.addProduct('producto prueba 1', 'Este es un producto prueba', 200, 'sim imagen', 'abc123', 60);
product.addProduct('producto prueba 2', 'Este es un producto prueba', 300, 'sim imagen', 'abc124', 80);
product.addProduct('producto prueba 3', 'Este es un producto prueba', 180, 'sim imagen', 'abc125', 43);
product.addProduct('producto prueba 4', 'Este es un producto prueba', 340, 'sim imagen', 'abc126', 51);
product.addProduct('producto prueba 5', 'Este es un producto prueba', 650, 'sim imagen', 'abc127', 62);
product.addProduct('producto prueba 6', 'Este es un producto prueba', 750, 'sim imagen', 'abc128', 38);
product.addProduct('producto prueba 7', 'Este es un producto prueba', 451, 'sim imagen', 'abc129', 85);
product.addProduct('producto prueba 8', 'Este es un producto prueba', 450, 'sim imagen', 'abc130', 47);
product.addProduct('producto prueba 9', 'Este es un producto prueba', 210, 'sim imagen', 'abc131', 93);
product.addProduct('producto prueba 10', 'Este es un producto prueba', 170, 'sim imagen', 'abc132', 105);*/
//product.getProducts();

// Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
//product.getProductById(1);
//product.getProductById(3);

//✓	Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
//product.updateProduct(1,"stock",1000);

//✓	Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
//product.deleteProduct(1);
//product.getProducts();
//product.getProductById(3);