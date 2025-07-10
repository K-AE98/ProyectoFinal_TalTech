document.addEventListener("DOMContentLoaded", () => {

    //Pido lo que este guardado en el carrito y lo convierto de JSON a JavaScript
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderizarProductos = () => {

        //url = "https://dummyjson.com/products";
        url = "https://dummyjson.com/products?limit=12";
        //url = "https://dummyjson.com/products/category/groceries";

        fetch(url)
        .then(res => res.json())
        .then(data => {
            let contenedorProductos = document.getElementById("contenedor-productos"); //IMPORTANTE agregar ID!!

            for (const producto of data.products) {
                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add("tarjeta-producto");
            
                let imagenProducto = document.createElement("img");
                imagenProducto.src = producto.images[0];
                imagenProducto.alt = producto.description;

                let tituloProducto = document.createElement("h3");
                tituloProducto.classList.add("titulo-producto");
                tituloProducto.textContent = producto.title;

                let precioProducto = document.createElement("p");
                precioProducto.textContent = `$${producto.price}`;

                let btnAgregar = document.createElement("button");
                btnAgregar.textContent = "Agregar";

                btnAgregar.addEventListener("click", () =>{
                    alert(`${producto.title} agregado al carrito`);
                    agregarProducto(producto);
                    actualizarAgredados();
                });

                tarjetaProducto.appendChild(imagenProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(btnAgregar);
            
                contenedorProductos.appendChild(tarjetaProducto);
            }
        })
        .catch(error => console.error("Error: ", error) );
    };
    const agregarProducto = (producto) => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };
    const actualizarAgredados = () => {
        const contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    };
    renderizarProductos();
    actualizarAgredados();
});