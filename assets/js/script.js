// Función constructora para Producto
function Producto(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
}

// Función constructora para Carrito
function Carrito() {
    this.productos = [];
}


// formatear a moneda chilena
const formatoMonedaChilena = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,

});

// Método para agregar un producto al carrito
Carrito.prototype.agregarProducto = function (producto, cantidad) {
    if (producto instanceof Producto && cantidad > 0 ) {
        for (let i = 0; i < cantidad; i++) {
            this.productos.push(producto);
        }
        alert(`${cantidad}  ${producto.nombre}(s) agregado(s) al carrito.`);
    }

};


// Método para calcular el total del carrito
Carrito.prototype.calcularTotal = function () {
    return this.productos.reduce(function (acumulador, producto) {
        return acumulador + producto.precio;
    }, 0);
};


// Método para finalizar la compra
Carrito.prototype.finalizarCompra = function () {
    let total = this.calcularTotal();
    this.productos = []; // Vaciar el carrito
    return total;
};


// Método para mostrar detalles del carrito
Carrito.prototype.mostrarDetalles = function (productosDisponibles) {
    if (this.productos.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    let detalles = 'Detalles de la compra:\n\n';
    const conteo = {};
    this.productos.forEach(producto => {
        conteo[producto.nombre] = (conteo[producto.nombre] || 0) + 1;
    });

        for (let i = 0; i < Object.keys(conteo).length; i++) {
            let nombre = Object.keys(conteo)[i]; // obtenemos la clave (nombre)
            let cantidad = conteo[nombre]; // obtenemos el valor asociado (cantidad)
            const producto = productosDisponibles.find(producto => producto.nombre === nombre);
            if (producto) {
                detalles += `Producto: ${nombre.toUpperCase()},  Cantidad: ${cantidad},  Precio Unitario: ${formatoMonedaChilena.format(producto.precio)} \n\n`;
            }
        }

    detalles += `Total: ${formatoMonedaChilena.format(this.calcularTotal())}`;
    alert(detalles);
};


// Lista de productos disponibles
let productosDisponibles = [
    new Producto('Leche', 1000),
    new Producto('Pan de Molde', 2000),
    new Producto('Queso', 1200),
    new Producto('Mermelada', 890),
    new Producto('Azúcar', 1300)
];

// Función para ingresar un producto y cantidad

function ingresarProducto() {
    let seleccion = 0;
    let cantidad = 0;

    // Ciclo para seleccionar el producto
    while (seleccion === 0) {
        const opciones = productosDisponibles
            .map((producto, index) => `${index + 1}: ${producto.nombre} ${formatoMonedaChilena.format(producto.precio)}`)
            .join('\n');

        let entrada = prompt(`Productos Disponibles:\n${opciones} \nSeleccione un producto:`);
        if(entrada === null){
            alert('Operación cancelada. Vuelva pronto');
            return null;
        }

        seleccion = Number(entrada);

        // Validamos si la selección es válida
        if (isNaN(seleccion) || seleccion < 1 || seleccion > productosDisponibles.length) {
            alert("Selección inválida. Inténtelo de nuevo.");
            seleccion = 0;  
        }
    }

    // Ciclo para ingresar la cantidad
    while (cantidad === 0) {
        let entradaCantidad = prompt("Ingrese la cantidad del producto:   (máximo 20 productos)");

        // Si el usuario cancela el prompt
        if (entradaCantidad === null) {
            alert('Operación cancelada. Vuelva pronto');
            return null;  // Regresamos null si el usuario cancela
        }

        cantidad = Number(entradaCantidad);

        // Validamos si la cantidad es válida
        if (isNaN(cantidad) || cantidad <= 0 || cantidad > 20) {
            alert("Cantidad inválida. Inténtelo de nuevo.");
            cantidad = 0;  // Reiniciamos cantidad
        }
    }

    // Retornamos el producto seleccionado y la cantidad
    return { producto: productosDisponibles[seleccion - 1], cantidad };
}

function gestionarCarrito() {
    const carrito = new Carrito();
    let continuar = true;

    while (continuar) {
        const { producto, cantidad } = ingresarProducto();
        carrito.agregarProducto(producto, cantidad);


        let respuesta=true ;
        while (respuesta) {
            respuesta = prompt('¿Desea agregar otro producto? S/N')

            if (respuesta === null) {
                alert('Operación cancelada. Vuelva pronto');
                return null;  // Regresamos null si el usuario cancela
            }
            let normalizarRespuesta= respuesta.toLocaleLowerCase()
            if (normalizarRespuesta === 's') {
                continuar = true;
                break;
            } else if (normalizarRespuesta === 'n') {
                continuar = false;
                break;
            } else {
                alert('Respuesta inválida. Por favor, responda S o N.');
            }
        }
    }

    // Mostrar detalles del carrito antes de finalizar la compra
    carrito.mostrarDetalles(productosDisponibles, formatoMonedaChilena);

    // Confirmar finalización de la compra
    const confirmarFinalizar = confirm('¿Desea finalizar la compra?');
    if (confirmarFinalizar) {
        const total = carrito.finalizarCompra();
        alert(`Compra finalizada.\n \n TOTAL A PAGAR : ${formatoMonedaChilena.format(total)} \n VUELVA PRONTO!`);
    } else {
        alert('Compra cancelada.');
    }
}
gestionarCarrito();





